import Head from 'next/head'
import { Button, Code, Heading, Text } from '@chakra-ui/react'

import { useAuth } from '@/lib/auth'

export default function Home() {
  const auth = useAuth()

  return (
    <div>
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <main>
        <Heading>
          Fast Feedback
        </Heading>
        <Text>
          Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>
        {auth.user ? (
          <Button onClick={(e) => auth.signout()}>Sign out</Button>
        ) : (
          <Button onClick={(e) => auth.signinWithGitHub()}>Sign In with GitHub</Button>
        )}
      </main>
    </div>
  )
}
