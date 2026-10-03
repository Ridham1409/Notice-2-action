import React from 'react';
import Link from 'next/link';
import { LucideIcon, ArrowUpRight } from 'lucide-react';

export interface StatCardProps {
  title: string;
  count: number | string;
  description: string;
  icon: LucideIcon;
  href: string;
  iconColor?: string;
  iconBg?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  count,
  description,
  icon: Icon,
  href,
  iconColor = 'text-primary-600',
  iconBg = 'bg-primary-50',
}) => {
  return (
    <Link
      href={href}
      className="group relative bg-surface rounded-2xl border border-border p-5 sm:p-6 transition-all duration-200 hover:shadow-cardHover hover:border-slate-300 flex flex-col justify-between"
    >
      <div className="flex items-start justify-between">
        <div className={`h-11 w-11 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-sm`}>
          <Icon className="h-5 w-5 stroke-[2]" />
        </div>
        <div className="rounded-full p-1 text-slate-300 group-hover:text-slate-700 group-hover:bg-slate-100 transition-all">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 block">
          {count}
        </span>
        <h4 className="text-sm font-semibold text-slate-800">{title}</h4>
        <p className="text-xs text-slate-500 line-clamp-1">{description}</p>
      </div>
    </Link>
  );
};
