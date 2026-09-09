import { getHouseholdContext } from '@/app/actions/household';
import { prisma } from '@/lib/db';
import { Target, TrendingDown, TrendingUp, AlertCircle, Calendar } from 'lucide-react';

export default async function DashboardPage() {
  const membership = await getHouseholdContext();
  if (!membership) return null;

  const household = membership.household;

  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);

  const transactions = await prisma.transaction.findMany({
    where: {
      householdId: household.id,
      date: { gte: currentMonthStart }
    },
    include: { category: true }
  });

  const income = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + t.amount, 0);
  const spent = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + t.amount, 0);
  const saved = income - spent;

  // Formatting currency helper
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const currentMonthName = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  // Calculate this month's spending by category
  const categorySpending = transactions
    .filter(t => t.type === 'EXPENSE' && t.category)
    .reduce((acc, t) => {
      const name = t.category!.name;
      acc[name] = (acc[name] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);
    
  const topCategories = Object.entries(categorySpending)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, amount], i) => ({
      name,
      amount,
      color: ['bg-indigo-500', 'bg-emerald-500', 'bg-blue-500', 'bg-amber-500', 'bg-pink-500', 'bg-gray-400'][i % 6]
    }));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Good morning, {household.name}</h1>
        <p className="text-[#475569]">{currentMonthName}</p>
      </div>

      {/* Monthly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 text-[#475569] mb-2">
            <TrendingUp size={18} className="text-emerald-600" />
            <h3 className="font-medium">Income</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{formatINR(income)}</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 text-[#475569] mb-2">
            <TrendingDown size={18} className="text-amber-600" />
            <h3 className="font-medium">Spent</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{formatINR(spent)}</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 text-[#475569] mb-2">
            <Target size={18} className="text-blue-600" />
            <h3 className="font-medium">Saved</h3>
          </div>
          <p className="text-3xl font-bold text-[#0F172A]">{formatINR(saved)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Financial Health */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Financial Health</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl font-bold text-[#0F172A]">78<span className="text-xl text-[#94A3B8] font-normal">/100</span></div>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            <p className="text-[#475569] bg-[#FAFAFA] p-3 rounded-lg border border-gray-100 text-sm">
              Your family is doing well, but <span className="font-medium text-[#0F172A]">dining</span> and <span className="font-medium text-[#0F172A]">shopping</span> are above this month's plan.
            </p>
          </div>

          {/* This Month's Spending */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">This Month's Spending</h2>
            {topCategories.length > 0 ? (
              <div className="space-y-4">
                {topCategories.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${cat.color}`}></div>
                      <span className="text-[#475569] font-medium">{cat.name}</span>
                    </div>
                    <span className="text-[#0F172A] font-semibold">{formatINR(cat.amount)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#475569] text-sm">No expenses recorded this month yet.</p>
            )}
          </div>

        </div>

        {/* Right Column (Side Content) */}
        <div className="space-y-6">

          {/* Upcoming Payments */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-[#64748B]" />
              Upcoming
            </h2>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#475569]">Rent</span>
                <span className="text-[#0F172A] font-medium">{formatINR(12000)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#475569]">Electricity</span>
                <span className="text-[#0F172A] font-medium">{formatINR(2400)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#475569]">Internet</span>
                <span className="text-[#0F172A] font-medium">{formatINR(899)}</span>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100 flex justify-between text-sm font-semibold">
              <span className="text-[#0F172A]">Total upcoming</span>
              <span className="text-[#0F172A]">{formatINR(15299)}</span>
            </div>
          </div>

          {/* Savings Goals */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Savings Goals</h2>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-[#0F172A]">Emergency Fund</span>
                <span className="text-[#64748B]">{formatINR(42000)} / {formatINR(100000)}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>

          {/* Insight Alert */}
          <div className="bg-amber-50 border border-amber-200 p-5 rounded-xl flex gap-3">
            <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-semibold text-amber-900 text-sm">FinTrack Insight</h4>
              <p className="text-amber-800 text-sm mt-1">Your household spent {formatINR(1800)} more on shopping than last month.</p>
              <button className="text-amber-700 text-sm font-medium mt-2 hover:underline">View Details</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
