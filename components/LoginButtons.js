import { Button, Stack } from '@chakra-ui/react';

import Icon from '@/components/Icon'
import { useAuth } from '@/lib/auth';

const LoginButtons = () => {
    const auth = useAuth();

    return (
        <Stack isInline mt={4}>
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
                <Icon name="github" boxSize="7" mr="2" />Continue with GitHub
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
                <Icon name="google" boxSize="7" mr="2" />Continue with Google
            </Button>
        </Stack>
    );
};

export default LoginButtons;