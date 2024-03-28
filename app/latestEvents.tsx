import prisma from '@/prisma/client'
import { Avatar, Card, Flex, Heading, Link, Table } from '@radix-ui/themes'
import { StatusBadge } from './components'

async function LatestEvents() {
    const events = await prisma?.events.findMany({
        orderBy: {createdAt: 'asc'},
        take: 5,
        include: {
          assignedUser: true
        },
    })    
  return (
    <Card>
      <Heading mb={'4'} size={'4'}>Latest Events</Heading>
    <Table.Root>
      <Table.Body>
        {
          events.map(event => (
            <Table.Row key={event.id}>
              <Table.Cell>
                <Flex justify={'between'}>
                <Flex direction={'column'}>
                  <Link href={`/events/${event.id}`}>{event.title}</Link>
                  <StatusBadge status={event.status}/>
                </Flex>
                {
                  event.assignedUser && (
                    <Avatar fallback='?'/>
                  )
                }
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table.Root>
    </Card>
  )
}

export default LatestEvents