'use client';

import { deleteTransaction, seedMockTransactions } from '@/app/actions/transaction';
import { Trash2, Sparkles } from 'lucide-react';
import { useTransition } from 'react';

type Tx = {
  id: string;
  type: string;
  amount: number;
  description: string | null;
  date: Date;
  category: { name: string } | null;
  user: { name: string | null };
};

export default function TransactionList({ transactions }: { transactions: Tx[] }) {
  const [isPending, startTransition] = useTransition();

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      startTransition(() => {
        deleteTransaction(id);
      });
    }
  };

  const handleSeed = () => {
    startTransition(() => {
      seedMockTransactions();
    });
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white p-12 rounded-xl border border-gray-200 shadow-sm text-center flex flex-col items-center justify-center">
        <h3 className="text-lg font-medium text-[#0F172A]">Your spending story starts here.</h3>
        <p className="text-[#475569] mt-2 mb-6">Add your first expense to see where your family's money is going.</p>
        <button 
          onClick={handleSeed}
          disabled={isPending}
          className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-100 transition-colors disabled:opacity-50 text-sm"
        >
          <Sparkles size={16} />
          Load Demo Data
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-gray-200 text-sm font-medium text-[#475569]">
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Member</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-[#475569]">
                  {tx.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-[#0F172A]">
                  {tx.description || '—'}
                </td>
                <td className="px-6 py-4 text-sm text-[#475569]">
                  {tx.category ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs font-medium">
                      {tx.category.name}
                    </span>
                  ) : '—'}
                </td>
                <td className="px-6 py-4 text-sm text-[#475569]">
                  {tx.user.name || 'Unknown'}
                </td>
                <td className={`px-6 py-4 text-sm font-semibold text-right ${tx.type === 'INCOME' ? 'text-emerald-600' : 'text-[#0F172A]'}`}>
                  {tx.type === 'INCOME' ? '+' : '-'}{formatINR(tx.amount)}
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleDelete(tx.id)}
                    disabled={isPending}
                    className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
