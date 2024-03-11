import prisma from '@/prisma/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import NewEventLoadingSkelton from './loading';
const EventForm = dynamic(
  () => import('@/app/events/_components/eventForm'),
  {
    ssr: false,
    loading: () => <NewEventLoadingSkelton/>
  }
  )

interface props {
  params: { id: string }
}

async function EditEvent({params}: props) {
    const getEvent = await prisma?.events.findUnique({
      where: { id: parseInt(params.id) }
    })
  
    if (!getEvent) notFound()

  return (
    <>
    <EventForm event={getEvent}/>
    </>
  )
}

export default EditEvent