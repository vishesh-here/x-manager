
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { OptimizerPage } from '@/components/optimizer-page';

export default async function Optimizer() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  return <OptimizerPage />;
}
