'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

function DeleteButton({ id }: { id: number }) {
    const route = useRouter()

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'>
                    Delete Event
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Delete action</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure to delete this event ?
                </AlertDialog.Description>
                <Flex mt={'4'} gap={'3'}>
                    <AlertDialog.Cancel>
                        <Button color='iris' variant='outline'>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color='red' variant='outline' onClick={async () => {
                            await axios.delete(`/api/events/${id}`)
                            route.push('/events')
                            route.refresh() //force an automatic refetch
                        }}>Confirm</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteButton