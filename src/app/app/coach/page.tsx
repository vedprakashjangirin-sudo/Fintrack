import { Bot, User, ArrowUpRight } from 'lucide-react';

export default function CoachPage() {
  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-bold text-[#0F172A]">AI Budget Coach</h1>
        <p className="text-[#475569]">Ask questions about your household spending and get data-backed answers.</p>
      </div>

      <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
        
        {/* Chat History */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#FAFAFA]">
          {/* AI Welcome Message */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-white" />
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-xl rounded-tl-none shadow-sm max-w-[85%]">
              <p className="text-[#0F172A] text-sm">
                Hi! I'm your FinTrack coach. I can see your family has spent ₹51,200 so far this month. 
                Your shopping expenses are a bit higher than usual. What would you like to know about your finances today?
              </p>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-4 flex-row-reverse">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <User size={16} className="text-indigo-600" />
            </div>
            <div className="bg-[#0F172A] p-4 rounded-xl rounded-tr-none shadow-sm max-w-[85%]">
              <p className="text-white text-sm">
                Can we afford a ₹15,000 laptop purchase next week?
              </p>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-[#0F172A] flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-white" />
            </div>
            <div className="bg-white border border-gray-200 p-4 rounded-xl rounded-tl-none shadow-sm max-w-[85%] space-y-3">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1 block">Summary</span>
                <p className="text-[#0F172A] text-sm font-medium">It's possible, but tight.</p>
              </div>
              
              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1 block">Facts</span>
                <ul className="text-sm text-[#475569] list-disc list-inside space-y-1">
                  <li>Current available cash: ₹22,000</li>
                  <li>Upcoming bills before month-end: ₹15,299</li>
                  <li>Required monthly savings: ₹6,500</li>
                </ul>
              </div>

              <div>
                <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1 block">Recommendation</span>
                <p className="text-sm text-[#475569]">
                  If you purchase the laptop for ₹15,000, you will fall short of your ₹6,500 Emergency Fund savings goal this month unless you reduce discretionary spending by ₹14,799. Consider delaying the purchase to next month.
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-400 italic">
                  This calculation is based entirely on the transactions recorded in FinTrack.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
          <form className="relative">
            <input 
              type="text" 
              placeholder="Ask a question about your finances..." 
              className="w-full pl-4 pr-12 py-3 bg-[#FAFAFA] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A] text-sm"
              disabled
            />
            <button 
              type="button" 
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#0F172A] text-white rounded-md hover:bg-[#1e293b] disabled:opacity-50"
              disabled
            >
              <ArrowUpRight size={16} />
            </button>
          </form>
          <p className="text-xs text-center text-gray-400 mt-2">
            The AI Coach is currently in Demo mode.
          </p>
        </div>

      </div>
    </div>
  );
}
