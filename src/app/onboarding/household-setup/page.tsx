import { createHousehold } from '@/app/actions/household';

export default function HouseholdSetupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#0F172A]">Welcome to FinTrack</h1>
          <p className="text-[#475569] mt-2">Let's set up your household</p>
        </div>

        <form action={createHousehold} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">Household Name</label>
            <input 
              type="text" 
              name="name"
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              placeholder="e.g. Sharma Family"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#0F172A] text-white py-2.5 rounded-lg hover:bg-[#1e293b] transition-colors font-medium mt-4"
          >
            Create Household
          </button>
        </form>
      </div>
    </div>
  );
}
