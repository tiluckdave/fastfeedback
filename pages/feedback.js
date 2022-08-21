import useSWR from 'swr'

import { useAuth } from '@/lib/auth'
import EmptyState from '@/components/EmptyState'
import FeedbackTableSkeleton from '@/components/FeedbackTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import FeedbackTable from '@/components/FeedbackTable'
import FeedbackTableHeader from '@/components/FeedbackTableHeader'

export default function MyFeedback() {
    const { user } = useAuth()
    const { data } = useSWR(user ? [ '/api/feedback', user.token ] : null, fetcher)

    return <DashboardShell>
        <FeedbackTableHeader />
        {!data ? <FeedbackTableSkeleton /> : (data.feedback.length ? <FeedbackTable feedback={data.feedback} /> : <EmptyState />)}
    </DashboardShell>
}
