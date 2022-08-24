import useSWR from 'swr'

import { useAuth } from '@/lib/auth'
import SiteEmptyState from '@/components/SiteEmptyState'
import Page from '@/components/Page';
import SiteTableSkeleton from '@/components/SiteTableSkeleton'
import DashboardShell from '@/components/DashboardShell'
import fetcher from '@/utils/fetcher'
import SiteTable from '@/components/SiteTable'
import SiteTableHeader from '@/components/SiteTableHeader'
import UpgradeEmptyState from '@/components/UpgradeEmptyState';

function Dashboard() {
    const { user } = useAuth()
    const { data } = useSWR(user ? [ '/api/sites', user.token ] : null, fetcher)
    const isPaidAccount = user?.stripeRole !== 'free'

    if (!data) {
        return (
            <DashboardShell>
                <SiteTableHeader />
                <SiteTableSkeleton />
            </DashboardShell>
        );
    }

    if (data.sites.length) {
        return (
            <DashboardShell>
                <SiteTableHeader isPaidAccount={isPaidAccount} />
                <SiteTable sites={data.sites} />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <SiteTableHeader />
            <SiteTableHeader isPaidAccount={isPaidAccount} />
            {isPaidAccount ? <SiteEmptyState /> : <UpgradeEmptyState />}
        </DashboardShell>
    );
}

export default function DashboardPage() {
    return <Page name="Dashboard" path="/dashboard">
        <Dashboard />
    </Page>
}