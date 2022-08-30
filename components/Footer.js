import React from 'react';
import NextLink from 'next/link';
import { Link, Flex } from '@chakra-ui/react';

const Footer = () => {
    return (
        <Flex mb={8} mt={24} justify="center">
            <NextLink href="/pricing" passHref>
                <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
                    Pricing
                </Link>
            </NextLink>
            <NextLink href="/privacy" passHref>
                <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
                    Privacy
                </Link>
            </NextLink>
            <NextLink href="/terms" passHref>
                <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
                    Terms
                </Link>
            </NextLink>
            <NextLink href="/docs" passHref>
                <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
                    Docs
                </Link>
            </NextLink>
            <NextLink href="/" passHref>
                <Link fontSize="sm" mr={4} fontWeight="medium" color="gray.500">
                    Home
                </Link>
            </NextLink>
        </Flex>
    );
};

export default Footer;