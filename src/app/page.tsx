import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans">
      <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-200">
        <div className="font-bold text-xl text-[#0F172A]">FinTrack</div>
        <div className="space-x-4">
          <Link href="/auth/login" className="text-[#475569] font-medium hover:text-[#0F172A] transition-colors">
            Log in
          </Link>
          <Link href="/auth/signup" className="bg-[#0F172A] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1e293b] transition-colors">
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] tracking-tight leading-tight">
          Your family's money,<br/> made simple.
        </h1>
        <p className="mt-6 text-lg md:text-xl text-[#475569] max-w-2xl">
          Track expenses, plan your monthly budget, and make smarter household decisions together.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link href="/auth/signup" className="bg-[#0F172A] text-white px-8 py-3.5 rounded-lg font-medium text-lg hover:bg-[#1e293b] transition-colors shadow-sm">
            Get Started
          </Link>
          <form action="/api/demo" method="POST">
            <button type="submit" className="bg-white text-[#0F172A] border border-gray-200 px-8 py-3.5 rounded-lg font-medium text-lg hover:bg-gray-50 transition-colors shadow-sm h-full flex items-center justify-center w-full sm:w-auto">
              Enter Demo Household
            </button>
          </form>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-[#0F172A] text-lg">Track together</h3>
            <p className="text-[#475569] mt-2">Everyone in the family can contribute to tracking income and expenses in one shared view.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-[#0F172A] text-lg">Plan ahead</h3>
            <p className="text-[#475569] mt-2">See upcoming payments and projected cash flow before the end of the month.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-[#0F172A] text-lg">Understand spending</h3>
            <p className="text-[#475569] mt-2">Find exactly where your money is going and detect meaningful spending changes automatically.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
