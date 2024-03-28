import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import React from 'react'

type props = {
    itemCount: number,
    pageSize: number,
    currentPage: number
}

function Pagination({ itemCount, pageSize, currentPage }: props) {
    const pageCount = Math.ceil(itemCount / pageSize)
    if (!pageCount) return

    return (
        <Flex align={'center'} gap={'2'}>
            <Text> Page {currentPage} of {pageCount} </Text>
            <Button
                variant='soft'
                color='gray'
                disabled={currentPage === 1}
            >
                <DoubleArrowLeftIcon />
            </Button>

            <Button
                variant='soft'
                color='gray'
                disabled={currentPage === 1}
            >
                <ChevronLeftIcon />
            </Button>

            <Button
                variant='soft'
                color='gray'
                disabled={currentPage === pageCount}
            >
                <ChevronRightIcon />
            </Button>

            <Button
                variant='soft'
                color='gray'
                disabled={currentPage === pageCount}
            >
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination