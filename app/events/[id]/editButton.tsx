import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button, Link } from '@radix-ui/themes'
import React from 'react'

function editButton({ id }: { id: number }) {
    return (
        <Button>
            <Pencil2Icon />
            <Link href={`/events/${id}/edit`}> Edit Event </Link>
        </Button>
    )
}

export default editButton