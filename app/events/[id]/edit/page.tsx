import React from 'react'
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import EventForm from '../../_components/eventForm';

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