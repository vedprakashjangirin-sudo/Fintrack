export default function CashFlowPage() {
  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Cash Flow Forecast</h1>
        <p className="text-[#475569]">Projected balance for the end of the month.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-[#FAFAFA] border-b border-gray-200">
          <p className="text-sm font-medium text-[#475569] uppercase tracking-wider mb-1">Projected Month-End</p>
          <p className="text-4xl font-bold text-[#0F172A]">{formatINR(42000)}</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-[#475569]">Current Available</span>
            <span className="font-medium text-[#0F172A]">{formatINR(22000)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-[#475569]">Expected Income</span>
            <span className="font-medium text-emerald-600">+{formatINR(50000)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-[#475569]">Upcoming Payments</span>
            <span className="font-medium text-amber-600">-{formatINR(18000)}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-[#475569]">Expected Regular Spending</span>
            <span className="font-medium text-amber-600">-{formatINR(12000)}</span>
          </div>
        </div>
      </div>
      
      <p className="text-xs text-center text-[#94A3B8]">
        * This forecast is an estimate based on your recurring bills and historical spending averages.
      </p>
    </div>
  );
}
