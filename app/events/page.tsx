import { Events } from '@prisma/client';
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import StatusBadge from '../components/statusBadge';
import prisma from '@/prisma/client';

async function EventsPage() {
  const events: Events[] = await prisma?.events.findMany()

  return (
    <div>
      <div>
        <Button className='mb-3'>
          <Link href={'/events/new'}>Add Event</Link>
        </Button>
      </div>
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