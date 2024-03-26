import { StatusBadge } from '@/app/components'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Events } from '@prisma/client';

function EventDetails({event}: {event: Events}) {
    return (
        <>
            <Heading>{event.title}</Heading>
            <Flex className='space-x-3' my={'2'}>
                <StatusBadge status={event.status} />
                <Text>{event.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose max-w-full' mt={'4'}>
                <ReactMarkdown>{event.description}</ReactMarkdown>
            </Card>
        </>
    )
}

export default EventDetails