import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditButton from './editButton';
import EventDetails from './eventDetails';

interface props {
  params: { id: string }
}

async function IssueLoading({ params }: props) {
  const event = await prisma?.events.findUnique({
    where: { id: parseInt(params.id) }
  })

  if (!event) notFound()

  return (
    <Grid columns={{initial: '1', md: '2'}} gap={'5'}>
      <Box>
        <EventDetails event={event}/>
      </Box>

      <Box>
        <EditButton id={event.id}/>
      </Box>
    </Grid>
  )
}

export const dynamic = 'force-dynamic'

export default IssueLoading