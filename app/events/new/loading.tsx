import { Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components'

function NewEvenLoading() {
    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Skeleton />
        </Box>
    )
}

export default NewEvenLoading