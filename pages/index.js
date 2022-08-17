import Head from 'next/head'
import { Box, Button, Code, Flex, Heading, Text } from '@chakra-ui/react'

import { useAuth } from '@/lib/auth'
import Icon from '@/components/Icon'

export default function Home() {
  const auth = useAuth()

  return (
    <Flex as="main" direction='column' align='center' justify='center' h='100vh' gap={4}>
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <Heading>
        <Icon name="logo" boxSize="12" />{' '}
        Fast Feedback
      </Heading>
      <Text>
        Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
      </Text>
      {auth.user ? (
        <Button as="a" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={(e) => auth.signinWithGitHub()}>
          Sign In
        </Button>
      )}
    </Flex>
  )
}
