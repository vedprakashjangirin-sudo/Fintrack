import { signup } from '@/app/actions/auth';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#0F172A]">Create your Household</h1>
          <p className="text-[#475569] mt-2">Join FinTrack and plan smarter together</p>
        </div>

        <form action={signup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">Full Name</label>
            <input 
              type="text" 
              name="name"
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              placeholder="Rajesh Sharma"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              placeholder="rajesh@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#0F172A] text-white py-2.5 rounded-lg hover:bg-[#1e293b] transition-colors font-medium mt-2"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#475569]">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#0F172A] font-medium hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
