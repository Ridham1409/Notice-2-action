import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Sparkles,
  Compass,
  CheckSquare,
  FileText,
  User,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { clsx } from 'clsx';

export interface SidebarProps {
  onOpenConflicts?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/', icon: LayoutDashboard },
    { name: 'Opportunities', href: '/opportunities', icon: Compass },
    { name: 'My Tasks', href: '/action-plan', icon: CheckSquare },
    { name: 'Notices', href: '/notices', icon: FileText },
    { name: 'Ask AI', href: '/assistant', icon: Sparkles },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-surface shrink-0 h-screen sticky top-0 justify-between select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-border/70">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-xl bg-primary-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-blue-500/25 group-hover:bg-primary-700 transition-colors">
            N
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-1">
              <span>NOTICE</span>
              <span className="text-primary-600">2ACTION</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-tight">
              Gujarat Education Assistant
            </p>
          </div>
        </Link>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Menu
        </div>

        {navigation.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group',
                isActive
                  ? 'bg-primary-50 text-primary-700 font-semibold shadow-subtle'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={clsx(
                    'h-4 w-4 shrink-0 transition-colors',
                    isActive
                      ? 'text-primary-600'
                      : 'text-slate-400 group-hover:text-slate-600'
                  )}
                />
                <span>{item.name}</span>
              </div>
            </Link>
          );
        })}

        {/* Subtle Database Trust Note */}
        <div className="pt-6 px-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span className="text-[11px] leading-tight text-slate-600">
              Verified from official Gujarat Government sources
            </span>
          </div>
        </div>
      </div>

      {/* User Footer Profile & Settings */}
      <div className="p-4 border-t border-border bg-slate-50/40">
        <Link
          href="/profile"
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-white hover:shadow-subtle transition-all group"
        >
          <div className="h-9 w-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
            RP
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-900 group-hover:text-primary-600 truncate">
              Student Profile
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              Edit academic details →
            </p>
          </div>
        </Link>
      </div>
    </aside>
  );
};
