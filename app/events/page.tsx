import { StatusBadge } from '@/app/components';
import prisma from '@/prisma/client';
import { Events, Status } from '@prisma/client';
import { Button, Flex, Table } from '@radix-ui/themes';
import Link from 'next/link';
import EventStatusFilter from './_components/statusFilter';

async function EventsPage({searchParams}: {searchParams : {status: Status}}) {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status: undefined

  const events: Events[] = await prisma?.events.findMany({
    where: {
      status: status
    }
  })

  return (
    <div>
      <Flex mb='3' justify={'between'}>
        <EventStatusFilter/>
        <Button>
          <Link href={'/events/new'}>Add Event</Link>
        </Button>
      </Flex>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Event</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created At</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>

          {
            events.map(event => (
              <Table.Row key={event.id}>
                <Table.RowHeaderCell>
                  <Link href={`/events/${event.id}`} className='hover:underline'>{event.title}</Link>
                  <div className='block md:hidden'><StatusBadge status={event.status} /></div>
                </Table.RowHeaderCell>
                <Table.Cell><StatusBadge status={event.status} /></Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{event.createdAt.toString()}</Table.Cell>
              </Table.Row>
            ))
          }


        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default EventsPage