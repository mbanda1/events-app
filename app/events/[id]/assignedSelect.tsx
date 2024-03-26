'use client'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { useEffect, useState } from 'react'

function SelectAssignee() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const fetch = async () => {
            const {data} = await axios.get<User[]>('/api/users')
            setUsers(data)
        }
        fetch()
    }, [])

    return (
        <div>
            <Select.Root defaultValue="apple">
                <Select.Trigger />
                <Select.Content>
                    {
                        users.map(user => {
                            return <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        })
                    }
                </Select.Content>
            </Select.Root>
        </div>
    )
}

export default SelectAssignee