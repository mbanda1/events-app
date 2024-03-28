'use client'
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string, value?: Status }[] = [
    { label: 'All'},
    { label: 'Open', value: 'OPEN' },
    { label: 'In progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
]
function EventStatusFilter() {
 const route = useRouter()
 const searchParams = useSearchParams()

    return (
        <div>
            <Select.Root 
            defaultValue={searchParams.get('status') || ''}
            onValueChange={(status) => {
                const params = new URLSearchParams()
                if (status) params.append('status', status)
                if (searchParams.get('orderBy'))
                    params.append('orderBy', searchParams.get('orderBy')!)


                const query = !status || status === 'All' ? '' : `?${params.toString()}`

                route.push('/events' + query)
            }}>
                <Select.Trigger placeholder='Filter status...' />
                <Select.Content>

                    {
                        statuses?.map(status => {
                            return <Select.Item key={status.value} value={status.value ?? 'All'}>{status.label}</Select.Item>
                        })
                    }

                </Select.Content>
            </Select.Root>
        </div>
    )
}

EventStatusFilter.propTypes = {}

export default EventStatusFilter
