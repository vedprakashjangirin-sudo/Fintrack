'use client';

import { addTransaction } from '@/app/actions/transaction';
import { useActionState, useEffect, useRef } from 'react';

type Category = { id: string; name: string };

export default function AddTransactionForm({ categories }: { categories: Category[] }) {
  const [state, formAction] = useActionState(addTransaction, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
      <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Add Transaction</h2>
      
      <form ref={formRef} action={formAction} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
        {state?.error && (
          <div className="col-span-full bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
            {state.error}
          </div>
        )}
        
        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-[#0F172A] mb-1">Type</label>
          <select name="type" required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]">
            <option value="EXPENSE">Expense</option>
            <option value="INCOME">Income</option>
          </select>
        </div>

        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-[#0F172A] mb-1">Amount (₹)</label>
          <input type="number" name="amount" required min="1" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]" placeholder="1000" />
        </div>

        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-[#0F172A] mb-1">Category</label>
          <select name="categoryId" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]">
            <option value="">-- None --</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-[#0F172A] mb-1">Description</label>
          <input type="text" name="description" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]" placeholder="Groceries at Reliance" />
        </div>

        <div className="lg:col-span-1">
          <label className="block text-sm font-medium text-[#0F172A] mb-1">Date</label>
          <input type="date" name="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]" />
        </div>

        <div className="col-span-full flex justify-end mt-2">
          <button type="submit" className="bg-[#0F172A] text-white px-6 py-2.5 rounded-lg hover:bg-[#1e293b] transition-colors font-medium">
            Add Record
          </button>
        </div>
      </form>
    </div>
  );
}
