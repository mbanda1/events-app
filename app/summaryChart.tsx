'use client'

import { Card } from '@radix-ui/themes'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

interface props {
    open: number,
    inProgress: number,
    closed: number,
}

function summaryChart({ open, inProgress, closed }: props) {
    const data = [
        { label: 'Open issues', value: open },
        { label: 'In-progress issues', value: inProgress },
        { label: 'Closed issues', value: closed },
    ]

    return (
        <Card>
            <ResponsiveContainer
                width={'100%'} height={300}
            >
                <BarChart data={data}>
                    <XAxis dataKey={'label'} />
                    <YAxis />
                    <Bar dataKey={'value'} barSize={60} style={{ fill: 'var(--accent-9)' }} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default summaryChart