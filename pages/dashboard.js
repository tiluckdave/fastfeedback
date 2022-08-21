import Head from 'next/head'
import useSWR from 'swr'
import { Box, Button, Code, Flex, Heading, Text } from '@chakra-ui/react'

import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import SiteTable from '@/components/SiteTable'

export default function Dashboard() {
    const { user } = useAuth()
    const { data } = useSWR(user ? [ '/api/sites', user.token ] : null, fetcher)

    return <DashboardShell>
        {!data ? <SiteTableSkeleton /> : data?.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
}
