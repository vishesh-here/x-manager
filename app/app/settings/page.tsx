
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { SettingsPage } from '@/components/settings-page';

export default async function Settings() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  return <SettingsPage />;
}
