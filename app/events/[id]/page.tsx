import authOptions from '@/app/auth/authOptions';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import SelectAssignee from './assignedUserSelect';
import DeleteButton from './deleteButton';
import EditButton from './editButton';
import EventDetails from './eventDetails';

interface props {
  params: { id: string }
}

const getEventById = cache(({ id }: { id: number }) => prisma.events.findUnique({ where: { id } }))

async function EventLoading({ params }: props) {
  const session = await getServerSession(authOptions)

  const event = await getEventById({ id: parseInt(params.id) })

  if (!event) notFound()

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap={'5'}>
      <Box className='md:col-span-4'>
        <EventDetails event={event} />
      </Box>

      {session && <Box>
        <Flex direction={'column'} gap={'4'}>
          <SelectAssignee event={event} />
          <EditButton id={event.id} />
          <DeleteButton id={event.id} />
        </Flex>
      </Box>
      }
    </Grid>
  )
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: props) {
  const event = await getEventById({ id: parseInt(params.id) })

  return {
    title: event?.title,
    description: event?.description,
  }
}

export default EventLoading