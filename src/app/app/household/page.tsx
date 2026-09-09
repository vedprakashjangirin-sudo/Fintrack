import { Users, UserPlus, Shield } from 'lucide-react';

export default function HouseholdSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">Household Settings</h1>
        <p className="text-[#475569]">Manage the members of your household.</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-[#0F172A]">Members</h2>
          <button className="flex items-center gap-2 bg-[#0F172A] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#1e293b] transition-colors text-sm">
            <UserPlus size={16} />
            <span>Invite Member</span>
          </button>
        </div>

        <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
          <div className="p-4 flex items-center justify-between bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                R
              </div>
              <div>
                <p className="font-medium text-[#0F172A]">Rajesh Sharma</p>
                <p className="text-xs text-[#475569]">rajesh@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              <Shield size={12} />
              Owner
            </div>
          </div>
          
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">
                P
              </div>
              <div>
                <p className="font-medium text-[#0F172A]">Priya Sharma</p>
                <p className="text-xs text-[#475569]">priya@example.com</p>
              </div>
            </div>
            <div className="text-xs font-medium text-gray-500 px-2 py-1 bg-gray-100 rounded">
              Member
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-2">Household Name</h2>
        <form className="flex gap-4">
          <input 
            type="text" 
            defaultValue="Sharma Family"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
          />
          <button type="button" className="bg-[#FAFAFA] text-[#0F172A] border border-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
            Save
          </button>
        </form>
      </div>

    </div>
  );
}
