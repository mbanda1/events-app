import Table, { theStatuses } from '@/app/events/Table';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import Pagination from '../components/pagination';
import EventStatusFilter from './_components/statusFilter';

type props = {
  searchParams: theStatuses
}

async function EventsPage({ searchParams }: props) {
  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const where = { status: status }


  const page = parseInt(searchParams.page) || 1
  const pageSize = 5

  const eventsCounts = await prisma.events.count({
    where,
  })

  return (
    <div>
      <Flex mb='3' justify={'between'}>
        <EventStatusFilter />
        <Button>
          <Link href={'/events/new'}>Add Event</Link>
        </Button>
      </Flex>

      <Flex gap={'2'} direction={'column'}>
        <Table page={page} pageSize={pageSize} searchParams={searchParams} />
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={eventsCounts}
        />
      </Flex>
    </div>
  )
}

export default EventsPage