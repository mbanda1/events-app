'use client'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'

function SelectAssignee() {
    const {data: users, error, isLoading} = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get<User[]>('/api/users')
                    .then((res) => res.data),
        staleTime: 60 * 100, // 60 seconds
        retry: 2 //retry upto 2 times if we have an error
    })

    if (isLoading) return <Skeleton/>

    return (
        <div>
            <Select.Root>
                <Select.Trigger />
                <Select.Content>
                    {
                        users?.map(user => {
                            return <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        })
                    }
                </Select.Content>
            </Select.Root>
        </div>
    )
}

export default SelectAssignee