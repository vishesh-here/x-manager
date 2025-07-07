
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { AnalyticsPage } from '@/components/analytics-page';

export default async function Analytics() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  return <AnalyticsPage />;
}
