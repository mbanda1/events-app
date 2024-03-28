import { Status } from '@prisma/client'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'

interface props {
    open: number,
    inProgress: number,
    closed: number,
}

function summaryPage({open, inProgress, closed}: props) {

  const cards: {
    label: string,
    value: number,
    status: Status
  }[] = [
    {label: 'Open issues', value: open, status: 'OPEN'},
    {label: 'In-progress issues', value: inProgress, status: 'IN_PROGRESS'},
    {label: 'Closed issues', value: closed, status: 'CLOSED'},
  ]
  return (
    <Card>
        <Flex direction={'row'} gap={'2'}>
           {
            cards.map(card => (
                <Card key={card.label}>
                  <Flex direction={'column'} gap={'1'}>
                    <Link 
                    className='text-sm font-medium'
                    href={`/events?status${card.status}`}>
                        {card.label}
                    </Link>
                    <Text size='5' className='font-bold'>{card.value}</Text>
                  </Flex>
                </Card>
            ))
           }
        </Flex>
    </Card>
  )
}

export default summaryPage