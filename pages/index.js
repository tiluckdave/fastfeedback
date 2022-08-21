import Head from 'next/head'
import { Box, Button, Code, Flex, Heading, Stack, Text } from '@chakra-ui/react'

import { useAuth } from '@/lib/auth'
import Icon from '@/components/Icon'

export default function Home() {
  const auth = useAuth()

  return (
    <Box background="gray.100">
      <Flex as="main" direction='column' align='center' justify='center' h='100vh' gap={4}>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                window.location.href = "/dashboard"
              }`,
            }}
          />
          <title>Fast Feedback</title>
        </Head>
        <Heading>
          <Icon name="logo" boxSize="12" />{' '}
          Fast Feedback
        </Heading>
        <Text mb={4}>
          Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>
        {auth.user ? (
          <Button
            as="a" href="/dashboard"
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bg: 'gray.700' }}
            _active={{
              bg: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            View Dashboard
          </Button>

        ) : (
          <Stack>
            <Button
              onClick={(e) => auth.signinWithGitHub()}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
            >
              <Icon name="github" boxSize="7" mr="2" />Sign In with GitHub
            </Button>
            <Button
              onClick={(e) => auth.signinWithGoogle()}
              backgroundColor="white"
              color="gray.900"
              fontWeight="medium"
              variant="outline"
              _hover={{ bg: 'gray.50' }}
              _active={{
                bg: 'gray.200',
                transform: 'scale(0.95)'
              }}
            >
              <Icon name="google" boxSize="7" mr="2" />Sign In with Google
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  )
}
