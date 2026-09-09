import { AlertCircle } from 'lucide-react';

export default function BudgetPage() {
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  const budgets = [
    { name: 'Housing', spent: 12000, limit: 15000, color: 'bg-indigo-500' },
    { name: 'Food', spent: 8450, limit: 8000, color: 'bg-emerald-500' },
    { name: 'Transport', spent: 4200, limit: 5000, color: 'bg-amber-500' },
    { name: 'Education', spent: 8000, limit: 8000, color: 'bg-blue-500' },
    { name: 'Lifestyle', spent: 6100, limit: 6000, color: 'bg-pink-500' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Monthly Budget</h1>
        <p className="text-[#475569]">Track your planned spending against your actual expenses.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3">
        <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
        <div>
          <h4 className="font-semibold text-amber-900 text-sm">Food budget exceeded</h4>
          <p className="text-amber-800 text-sm mt-1">You've spent ₹8,450 against an ₹8,000 budget.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        {budgets.map((b) => {
          const percent = Math.min((b.spent / b.limit) * 100, 100);
          const isOver = b.spent > b.limit;
          
          return (
            <div key={b.name}>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-[#0F172A]">{b.name}</span>
                <span className="text-[#475569] text-sm">
                  <span className={isOver ? 'text-red-600 font-semibold' : ''}>{formatINR(b.spent)}</span> / {formatINR(b.limit)}
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${isOver ? 'bg-red-500' : b.color}`} 
                  style={{ width: `${percent}%` }}
                ></div>
              </div>
              <div className="mt-1 text-right text-xs text-[#64748B]">
                {isOver ? (
                  <span className="text-red-500 font-medium">{formatINR(b.spent - b.limit)} over budget</span>
                ) : (
                  <span>{formatINR(b.limit - b.spent)} remaining</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
