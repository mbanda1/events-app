import StatusBadge from '@/app/components/statusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

interface props {
    params: {id: string}
}

async function IssueLoading({params}: props) {
      const event = await prisma?.events.findUnique({
        where: {id: parseInt(params.id)}
      })
    
      if (!event) notFound()

  return (
    <div>
         <Heading>{event.title}</Heading>
         <Flex className='space-x-3' my={'2'}>
            <StatusBadge status={event.status} />
            <Text>{event.createdAt.toDateString()}</Text>
         </Flex>
         <Card className='prose mt-2'>
            <ReactMarkdown>{event.description}</ReactMarkdown>
         </Card>
    </div>
  )
}

export default IssueLoading