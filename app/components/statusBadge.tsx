import React from 'react'
import { Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import { Badge } from '@radix-ui/themes'

const statusMap: Record<Status, { label: string, color: "red" | "orange" | "green" }> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In progress', color: 'orange' },
    CLOSED: { label: 'Closed', color: 'green' }
}

function StatusBadge({ status }: { status: Status }) {
    return (

        <Flex gap="2">
            <Badge color={statusMap[status].color}>
                {statusMap[status].label}
            </Badge>
        </Flex>
    )
}

export default StatusBadge