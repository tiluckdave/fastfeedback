import Head from 'next/head'
import { Box, Button, Link, Flex, Stack, Text } from '@chakra-ui/react'

import { useAuth } from '@/lib/auth'
import Icon from '@/components/Icon'

import { getAllFeedback } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';

const SITE_ID = 'vJwnPPJaDu7l5oW2r4wQ';

export async function getStaticProps(context) {
  const { feedback } = await getAllFeedback(SITE_ID);

  return {
    props: {
      allFeedback: feedback
    },
    revalidate: 1
  };
}

export default function Home({ allFeedback }) {
  const auth = useAuth()

  return (
    <>
      <Box bg="gray.100" py={16}>
        <Flex as="main" direction="column" maxW="700px" margin="0 auto">
          <Head>
            <script
              dangerouslySetInnerHTML={{
                __html: `
            if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
              window.location.href = "/dashboard"
            }
          `
              }}
            />
          </Head>
          <Icon color="black" name="logo" boxSize="12" mb={2} />
          <Text mb={4} fontSize="lg" py={4}>
            <Text as="span" fontWeight="bold" display="inline">
              Fast Feedback
            </Text>

            {` Is the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in. Be aware that you will loose all your sites and feedback once we shift to the production database`}
          </Text>
          {auth.user ? (
            <Button
              as="a"
              href="/dashboard"
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              mt={2}
              maxW="200px"
              _hover={{ bg: 'gray.700' }}
              _active={{
                bg: 'gray.800',
                transform: 'scale(0.95)'
              }}
            >
              View Dashboard
            </Button>
          ) : (
            <Stack isInline>
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
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
        mt={8}
      >
        <FeedbackLink siteId={SITE_ID} />
        {allFeedback.map((feedback) => (
          <Feedback key={feedback.id} {...feedback} />
        ))}
      </Box>
    </>
  )
}
