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
} from 'lucide-react';
import { clsx } from 'clsx';

export const MobileHeader: React.FC = () => {
  return (
    <header className="lg:hidden sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border px-4 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
          N
        </div>
        <span className="font-bold text-sm tracking-tight text-slate-900">
          NOTICE<span className="text-primary-600">2ACTION</span>
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <Link
          href="/profile"
          className="h-7 w-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-semibold"
          title="Student Profile"
        >
          RP
        </Link>
      </div>
    </header>
  );
};

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  const items = [
    { name: 'Home', href: '/', icon: LayoutDashboard },
    { name: 'Opportunities', href: '/opportunities', icon: Compass },
    { name: 'My Tasks', href: '/action-plan', icon: CheckSquare },
    { name: 'Notices', href: '/notices', icon: FileText },
    { name: 'Ask AI', href: '/assistant', icon: Sparkles },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border px-2 py-1.5 flex items-center justify-around shadow-lg">
      {items.map((item) => {
        const isActive =
          item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              'flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition-colors',
              isActive
                ? 'text-primary-600 font-semibold'
                : 'text-slate-500 hover:text-slate-900'
            )}
          >
            <item.icon className="h-4 w-4" />
            <span className="text-[10px] tracking-tight">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};
