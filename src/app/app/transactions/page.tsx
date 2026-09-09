import { prisma } from '@/lib/db';
import { getHouseholdContext } from '@/app/actions/household';
import AddTransactionForm from './AddTransactionForm';
import TransactionList from './TransactionList';
import { redirect } from 'next/navigation';

export default async function TransactionsPage() {
  const membership = await getHouseholdContext();
  if (!membership) return redirect('/auth/login');

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  });

  const transactions = await prisma.transaction.findMany({
    where: { householdId: membership.householdId },
    include: {
      category: { select: { name: true } },
      user: { select: { name: true } }
    },
    orderBy: { date: 'desc' }
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A]">Transactions</h1>
        <p className="text-[#475569]">Manage your household income and expenses.</p>
      </div>

      <AddTransactionForm categories={categories} />
      
      <h2 className="text-lg font-semibold text-[#0F172A] mb-4">History</h2>
      <TransactionList transactions={transactions} />
    </div>
  );
}
