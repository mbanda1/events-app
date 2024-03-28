import prisma from '@/prisma/client'
import { Events, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import Link from 'next/link'
import { StatusBadge } from '../components'

const colum: { label: string, value?: keyof Events, className?: string }[] = [
    { label: 'Event', value: 'title' },
    { label: 'Status', value: 'status' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
]

export type theStatuses = {
    status: Status,
    orderBy: keyof Events,
    page: string
}

interface props {
    searchParams: theStatuses,
    page: number,
    pageSize: number
}

async function EventTable({ searchParams, page, pageSize, }: props) {
    const statuses = Object.values(Status)
    const status = statuses.includes(searchParams.status) ? searchParams.status : undefined

    const where = { status: status }

    const events: Events[] = await prisma?.events.findMany({
        where,
        orderBy: {
            [searchParams.orderBy ?? 'title']: 'asc'
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
    })

    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    {
                        colum.map(colum => (
                            <Table.ColumnHeaderCell key={colum.value}>
                                <Link href={{
                                    query: { ...searchParams, orderBy: colum.value }
                                }}>{colum.label}</Link>
                                {colum.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
                            </Table.ColumnHeaderCell>
                        ))
                    }
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
    )
}

export default EventTable