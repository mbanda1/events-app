'use client'
import { Button, Callout, Text, TextArea, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import axios from 'axios';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema } from '@/app/schema';
import {z} from 'zod'
import ErrorHandler from '@/app/components/formErrors';

type FromFields = z.infer<typeof eventSchema>

function NewEvent() {
 const route = useRouter()
 const { register, control, handleSubmit, formState: {errors, isSubmitting} } = useForm<FromFields>({
  resolver: zodResolver(eventSchema)
 })

  const [error, setError] = useState('')
 const submit = async (data: FromFields) => {
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
            <TextField.Input placeholder='Title' {...register('title')}/>
        </TextField.Root>
        {<ErrorHandler>{errors.title?.message}</ErrorHandler>}

        <Controller 
          name='description'
          control={control}
          render={({field}) => <SimpleMDE placeholder='Description' {...field} />}
        />
        {<ErrorHandler>{errors.description?.message}</ErrorHandler>}

        <Button> Submit {isSubmitting && <span>...</span>} </Button>
    </form>
    </div>
  )
}

export default NewEvent