import useSWR from 'swr'

import { useAuth } from '@/lib/auth'
import FeedbackEmptyState from '@/components/FeedbackEmptyState';
import Page from '@/components/Page';
import FeedbackTableSkeleton from '@/components/FeedbackTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import FeedbackTable from '@/components/FeedbackTable'
import FeedbackTableHeader from '@/components/FeedbackTableHeader'

function AllFeedback() {
    const { user } = useAuth()
    const { data } = useSWR(user ? [ '/api/feedback', user.token ] : null, fetcher)

    if (!data) {
        return (
            <DashboardShell>
                <FeedbackTableHeader />
                <FeedbackTableSkeleton />
            </DashboardShell>
        );
    }
    return (
        <DashboardShell>
            <FeedbackTableHeader />
            {data?.feedback?.length ? (
                <FeedbackTable feedback={data.feedback} />
            ) : (
                <FeedbackEmptyState />
            )}
        </DashboardShell>
    );
}

export default function AllFeedbackPage() {
    return <Page name="My Feedback" path="/feedback">
        <AllFeedback />
    </Page>
}
