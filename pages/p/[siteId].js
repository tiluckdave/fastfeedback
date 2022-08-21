import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import { useAuth } from "@/lib/auth";
import { getAllFeedback, getAllSites } from "@/lib/db-admin";
import { createFeedback } from "@/lib/db";
import Feedback from "@/components/Feedback";

export async function getStaticProps(context) {
    const siteId = context.params.siteId;
    const { feedback } = await getAllFeedback(siteId);
    return {
        props: {
            initialFeedback: feedback
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
        fallback: false,
    }
}

const FeedbackPage = ({ initialFeedback }) => {
    const auth = useAuth();
    const router = useRouter();
    const inputEl = useRef();
    const [ allFeedback, setAllFeedback ] = useState(initialFeedback);

    const onSubmit = (e) => {
        e.preventDefault();

        const newfeedback = {
            author: auth.user.name,
            authorId: auth.user.uid,
            siteId: router.query.siteId,
            createdAt: new Date().toISOString(),
            status: "pending",
            text: inputEl.current.value,
            provider: auth.user.provider
        }
        setAllFeedback([ newfeedback, ...allFeedback ]);
        createFeedback(newfeedback);
    }

    return <Box display="flex" flexDirection="column" maxWidth="700px" width="full" margin="0 auto">
        <Box as="form" onSubmit={onSubmit}>
            <FormControl my={8}>
                <FormLabel htmlFor="comment">Comment</FormLabel>
                <Input ref={inputEl} id="comment" placeholder="Leave a comment" />
                <Button mt={4} type="submit" fontWeight="medium">
                    Add Comment
                </Button>
            </FormControl>
        </Box>
        {
            allFeedback.map((feedback) => (
                <Feedback key={feedback.id} {...feedback} />
            ))
        }
    </Box >
}

export default FeedbackPage;