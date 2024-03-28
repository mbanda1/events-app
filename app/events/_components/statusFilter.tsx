'use client'
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const statuses: { label: string, state?: Status }[] = [
    { label: 'All'},
    { label: 'Open', state: 'OPEN' },
    { label: 'In progress', state: 'IN_PROGRESS' },
    { label: 'Closed', state: 'CLOSED' },
]
function EventStatusFilter() {
 const route = useRouter()

    return (
        <div>
            <Select.Root onValueChange={(value) => {
                const query = !value || value === 'All' ? '' : `?status=${value}`

                route.push('/events' + query)
            }}>
                <Select.Trigger placeholder='Filter status...' />
                <Select.Content>

                    {
                        statuses?.map(status => {
                            return <Select.Item key={status.state} value={status.state ?? 'All'}>{status.label}</Select.Item>
                        })
                    }

                </Select.Content>
            </Select.Root>
        </div>
    )
}

EventStatusFilter.propTypes = {}

export default EventStatusFilter
