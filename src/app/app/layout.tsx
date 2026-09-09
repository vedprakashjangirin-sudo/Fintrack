import Sidebar from '@/components/Sidebar';
import { getHouseholdContext } from '@/app/actions/household';
import { redirect } from 'next/navigation';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const membership = await getHouseholdContext();

  if (!membership) {
    redirect('/onboarding/household-setup');
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 sticky top-0 z-10 md:hidden">
          <h1 className="text-xl font-bold text-[#0F172A]">FinTrack</h1>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
