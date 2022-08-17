import Head from 'next/head'
import { Box, Button, Code, Flex, Heading, Text } from '@chakra-ui/react'

import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'

export default function Dashboard() {
    const auth = useAuth()

    if (!auth.user) {
        return 'Loading...';
    }

    return <EmptyState />;
}
