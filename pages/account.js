import { useState } from 'react';
import {
    Avatar,
    Heading,
    Box,
    Button,
    Flex,
    Text,
    Badge,
    StatGroup,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText
} from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { goToBillingPortal, createCheckoutSession } from '@/lib/db';
import Page from '@/components/Page';
import DashboardShell from '@/components/DashboardShell';

const FeedbackUsage = ({ stripeRole }) => {
    if (stripeRole === 'pro') {
        return <StatGroup>
            <Stat>
                <StatLabel color="gray.700">Feedback</StatLabel>
                <StatNumber fontWeight="medium">∞</StatNumber>
                <StatHelpText>Unlimited Feedback</StatHelpText>
            </Stat>

            <Stat>
                <StatLabel color="gray.700">Sites</StatLabel>
                <StatNumber fontWeight="medium">∞</StatNumber>
                <StatHelpText>Unlimited Sites</StatHelpText>
            </Stat>
        </StatGroup>
    }

    return <Box>
        Click on Upgrade to Pro. 😎
    </Box>

};

const SettingsTable = ({ stripeRole, children }) => (
    <Box
        backgroundColor="white"
        mt={8}
        borderRadius={[ 0, 8, 8 ]}
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
    >
        <Flex
            backgroundColor="gray.50"
            borderTopLeftRadius={[ 0, 8, 8 ]}
            borderTopRightRadius={[ 0, 8, 8 ]}
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            px={6}
            py={4}
        >
            <Flex justify="space-between" align="center" w="full">
                <Text
                    textTransform="uppercase"
                    fontSize="xs"
                    color="gray.500"
                    fontWeight="medium"
                    mt={1}
                >
                    Settings
                </Text>
                <Badge h="1rem" colorScheme="blue">
                    {stripeRole}
                </Badge>
            </Flex>
        </Flex>
        <Flex direction="column" p={6}>
            {children}
        </Flex>
    </Box >
);

function Account() {
    const { user, signout } = useAuth();
    const [ isBillingLoading, setBillingLoading ] = useState(false);
    const [ isCheckoutLoading, setCheckoutLoading ] = useState(false);

    return (
        <DashboardShell>
            <Flex
                direction="column"
                maxW="600px"
                align={[ 'left', 'center' ]}
                margin="0 auto"
            >
                <Flex direction="column" align={[ 'left', 'center' ]} ml={4}>
                    <Avatar
                        w={[ '3rem', '6rem' ]}
                        h={[ '3rem', '6rem' ]}
                        mb={4}
                        src={user?.photoUrl}
                    />
                    <Heading letterSpacing="-1px">{user?.name}</Heading>
                    <Text>{user?.email}</Text>
                </Flex>
                <SettingsTable stripeRole={user?.stripeRole}>
                    <FeedbackUsage stripeRole={user?.stripeRole} />
                    <Text my={4}>
                        Fast Feedback uses Stripe to update, change, or cancel your
                        subscription. You can also update card information and billing
                        addresses through the secure portal.
                    </Text>
                    <Flex justify="flex-end">
                        <Button variant="ghost" ml={4} onClick={() => signout()}>
                            Log Out
                        </Button>
                        {user?.stripeRole === 'pro' ? (
                            <Button
                                onClick={() => {
                                    setBillingLoading(true);
                                    goToBillingPortal();
                                }}
                                backgroundColor="gray.900"
                                color="white"
                                fontWeight="medium"
                                ml={4}
                                isLoading={isBillingLoading}
                                _hover={{ bg: 'gray.700' }}
                                _active={{
                                    bg: 'gray.800',
                                    transform: 'scale(0.95)'
                                }}
                            >
                                Manage Billing
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    setCheckoutLoading(true);
                                    createCheckoutSession(user.uid);
                                }}
                                backgroundColor="gray.900"
                                color="white"
                                fontWeight="medium"
                                ml={4}
                                isLoading={isCheckoutLoading}
                                _hover={{ bg: 'gray.700' }}
                                _active={{
                                    bg: 'gray.800',
                                    transform: 'scale(0.95)'
                                }}
                            >
                                Upgrade to Pro
                            </Button>
                        )}
                    </Flex>
                </SettingsTable>
            </Flex>
        </DashboardShell>
    );
};

export default function AccountPage() {
    return <Page name="Account" path="/account">
        <Account />
    </Page>
}
