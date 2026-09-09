import Link from 'next/link';
import { 
  Home, 
  CreditCard, 
  PieChart, 
  TrendingUp, 
  Target, 
  Bot, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react';
import { logout } from '@/app/actions/auth';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', href: '/app/dashboard', icon: Home },
    { name: 'Transactions', href: '/app/transactions', icon: CreditCard },
    { name: 'Budget', href: '/app/budget', icon: PieChart },
    { name: 'Cash Flow', href: '/app/cashflow', icon: TrendingUp },
    { name: 'Goals', href: '/app/goals', icon: Target },
    { name: 'AI Coach', href: '/app/coach', icon: Bot },
    { name: 'Household', href: '/app/household', icon: Users },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen hidden md:flex flex-col sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-[#0F172A]">FinTrack</h2>
        <p className="text-xs text-[#475569] mt-1">Your family's money</p>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-[#475569] hover:bg-gray-50 hover:text-[#0F172A] transition-colors"
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-1">
        <Link 
          href="/app/settings"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-[#475569] hover:bg-gray-50 hover:text-[#0F172A] transition-colors"
        >
          <Settings size={18} />
          Settings
        </Link>
        <form action={logout}>
          <button 
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
