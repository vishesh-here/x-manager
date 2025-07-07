
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { ComposePage } from '@/components/compose-page';

export default async function Compose() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  return <ComposePage />;
}
