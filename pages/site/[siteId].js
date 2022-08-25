import { Box, Button, FormControl, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import { useAuth } from "@/lib/auth";
import { createFeedback } from "@/lib/db";
import { getAllFeedback, getAllSites, getSite } from "@/lib/db-admin";
import Feedback from "@/components/Feedback";
import DashboardShell from '@/components/DashboardShell';
import SiteHeader from "@/components/SiteHeader";
import LoginButtons from "@/components/LoginButtons";


export async function getStaticProps(context) {
    const siteId = context.params.siteId;
    const { feedback } = await getAllFeedback(siteId);
    const { site } = await getSite(siteId);

    return {
        props: {
            initialFeedback: feedback,
            site
        },
        revalidate: 1
    }
}

export async function getStaticPaths() {
    const { sites } = await getAllSites();
    const paths = sites.map((site) => ({
        params: {
            siteId: site.id.toString()
        }
    }))
    return {
        paths,
        fallback: true,
    }
}

const FeedbackPage = ({ initialFeedback, site }) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const inputEl = useRef();
    const [ allFeedback, setAllFeedback ] = useState(initialFeedback);

    const onSubmit = (e) => {
        e.preventDefault();

        const newfeedback = {
            author: user.name,
            authorId: user.uid,
            siteId: router.query.siteId,
            createdAt: new Date().toISOString(),
            status: "pending",
            text: inputEl.current.value,
            provider: user.provider,
        }
        inputEl.current.value = '';
        setAllFeedback([ newfeedback, ...allFeedback ]);
        createFeedback(newfeedback);
    }

    const LoginOrLeaveFeedback = () =>
        user ? (
            <Button
                type="submit"
                isDisabled={router.isFallback}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                mt={4}
                _hover={{ bg: 'gray.700' }}
                _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)'
                }}
            >
                Leave Feedback
            </Button>
        ) : (
            <LoginButtons />
        );

    return (
        <DashboardShell>
            <SiteHeader siteName={site?.name} />
            <Box display="flex" flexDirection="column" maxWidth="700px" width="full" mx={4}>
                <Box as="form" onSubmit={onSubmit}>
                    <FormControl mb={8}>
                        <Textarea
                            ref={inputEl}
                            id="comment"
                            placeholder="Leave a comment"
                            h="100px"
                        />
                        {!loading && <LoginOrLeaveFeedback />}
                    </FormControl>
                </Box>
                {allFeedback &&
                    allFeedback.map((feedback) => (
                        <Feedback key={feedback.id} {...feedback} />
                    ))}
            </Box >
        </DashboardShell>
    );
}

export default FeedbackPage;