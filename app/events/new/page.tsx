import dynamic from 'next/dynamic'
import NewEventLoadingSkelton from '../_components/newEventLoadingSkelton'
const EventForm = dynamic(
  () => import('@/app/events/_components/eventForm'),
  {
    ssr: false,
    loading: () => <NewEventLoadingSkelton/>
  }
  )

function NewEvent() {
  return (
    <>
      <EventForm/>
    </>
  )
}

export default NewEvent