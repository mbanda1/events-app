import { Table } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function LoadingEvents() {
    const events = [1, 2, 3, 4, 5]

  return (
    <div>
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
                      <Table.Row key={event}>
                        <Table.RowHeaderCell>
                          <Skeleton />
                          <div className='block md:hidden'><Skeleton /></div>
                        </Table.RowHeaderCell>
                        <Table.Cell><Skeleton /></Table.Cell>
                        <Skeleton />
                      </Table.Row>
                    ))
                  }
        
                </Table.Body>
              </Table.Root>
    </div>
  )
}

export default LoadingEvents