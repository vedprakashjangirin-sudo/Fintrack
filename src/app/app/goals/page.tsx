import { Target } from 'lucide-react';

export default function GoalsPage() {
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Savings Goals</h1>
          <p className="text-[#475569]">Plan for your family's future.</p>
        </div>
        <button className="bg-[#0F172A] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1e293b] transition-colors text-sm">
          + New Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Goal 1 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Target size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A]">Emergency Fund</h3>
                <p className="text-xs text-[#64748B]">Target: March 2027</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#475569]">Progress</span>
              <span className="font-semibold text-[#0F172A]">{formatINR(42000)} / {formatINR(100000)}</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>

          <div className="bg-[#FAFAFA] p-3 rounded-lg border border-gray-100 text-sm">
            <p className="text-[#475569]">Required monthly saving: <span className="font-semibold text-[#0F172A]">{formatINR(6500)}</span></p>
          </div>
        </div>

        {/* Goal 2 */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                <Target size={20} />
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A]">Family Vacation</h3>
                <p className="text-xs text-[#64748B]">Target: December 2026</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#475569]">Progress</span>
              <span className="font-semibold text-[#0F172A]">{formatINR(12000)} / {formatINR(50000)}</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '24%' }}></div>
            </div>
          </div>

          <div className="bg-[#FAFAFA] p-3 rounded-lg border border-gray-100 text-sm">
            <p className="text-[#475569]">Required monthly saving: <span className="font-semibold text-[#0F172A]">{formatINR(5000)}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
