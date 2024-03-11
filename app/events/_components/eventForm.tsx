'use client'
import { FormErrors } from '@/app/components';
import { eventSchema } from '@/app/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Events } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false  
})

type FormFields = z.infer<typeof eventSchema>

function EventForm({event}: {event?: Events}) {

 const route = useRouter()
 const { register, control, handleSubmit, formState: {errors, isSubmitting} } = useForm<FormFields>({
  resolver: zodResolver(eventSchema)
 })

  const [error, setError] = useState('')
 const submit = async (data: FormFields) => {
  try {
    await axios.post('/api/events', data)
    route.push('/events')
  } catch (error) {
    setError('Error happened !')
  }
 }

  return (
    <div className='max-w-xl space-y-4'>
     {
      error && (
        <Callout.Root color='red'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )
     }
    <form  onSubmit={handleSubmit(submit)}>
        <TextField.Root>
            <TextField.Input defaultValue={event?.title} placeholder='Title' {...register('title')}/>
        </TextField.Root>
        {<FormErrors>{errors.title?.message}</FormErrors>}

        <Controller 
          name='description'
          control={control}
          defaultValue={event?.description}
          render={({field}) => <SimpleMDE placeholder='Description' {...field} />}
        />
        {<FormErrors>{errors.description?.message}</FormErrors>}

        <Button> Submit {isSubmitting && <span>...</span>} </Button>
    </form>
    </div>
  )
}

export default EventForm