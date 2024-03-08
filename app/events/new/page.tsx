'use client'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

function NewEevent() {
  return (
    <div className='max-w-xl space-y-4'>
        <TextField.Root>
            <TextField.Input placeholder='Title'/>
        </TextField.Root>

        <TextArea placeholder='Description' />

        <Button> Submit </Button>
    </div>
  )
}

export default NewEevent