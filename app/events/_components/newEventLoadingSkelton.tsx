import { Box } from '@radix-ui/themes'
import React from 'react'
import {Skeleton} from '@/app/components'

function NewEventLoadingSkelton() {
    return (
        <Box className='max-w-xl'>
            <Skeleton height={'3rem'}/>
            <Skeleton height={'20rem'}/>
        </Box>
    )
}

export default NewEventLoadingSkelton