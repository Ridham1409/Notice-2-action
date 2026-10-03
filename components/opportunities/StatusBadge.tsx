import React from 'react';
import { OpportunityStatus, DateVerificationStatus } from '@/types';
import { clsx } from 'clsx';

export interface StatusBadgeProps {
  status: OpportunityStatus | DateVerificationStatus | string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const normalized = status.toUpperCase().replace(/\s+/g, '_');

  const configs: Record<
    string,
    { label: string; bg: string; text: string; border: string; dot: string }
  > = {
    OPEN: {
      label: 'Open',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700 font-semibold',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
    },
    EXTENDED: {
      label: 'Extended',
      bg: 'bg-amber-50',
      text: 'text-amber-700 font-semibold',
      border: 'border-amber-300',
      dot: 'bg-amber-500',
    },
    OFFICIALLY_EXTENDED: {
      label: 'Officially Extended',
      bg: 'bg-amber-50',
      text: 'text-amber-700 font-semibold',
      border: 'border-amber-300',
      dot: 'bg-amber-500',
    },
    UPCOMING: {
      label: 'Upcoming',
      bg: 'bg-blue-50',
      text: 'text-blue-700 font-medium',
      border: 'border-blue-200',
      dot: 'bg-blue-500',
    },
    COMPLETED: {
      label: 'Concluded',
      bg: 'bg-slate-100',
      text: 'text-slate-600 font-medium',
      border: 'border-slate-200',
      dot: 'bg-slate-400',
    },
    CLOSED: {
      label: 'Closed',
      bg: 'bg-slate-100',
      text: 'text-slate-600 font-medium',
      border: 'border-slate-200',
      dot: 'bg-slate-400',
    },
    NOT_ANNOUNCED: {
      label: 'Not Announced',
      bg: 'bg-slate-100',
      text: 'text-slate-500 font-medium',
      border: 'border-slate-200',
      dot: 'bg-slate-400',
    },
    CONFLICTING: {
      label: 'Conflicting Data',
      bg: 'bg-rose-50',
      text: 'text-rose-700 font-medium',
      border: 'border-rose-200',
      dot: 'bg-rose-500',
    },
    NEEDS_VERIFICATION: {
      label: 'Needs Verification',
      bg: 'bg-purple-50',
      text: 'text-purple-700 font-medium',
      border: 'border-purple-200',
      dot: 'bg-purple-500',
    },
    OFFICIALLY_CONFIRMED: {
      label: 'Officially Confirmed',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700 font-semibold',
      border: 'border-emerald-200',
      dot: 'bg-emerald-500',
    },
    SECONDARY_SOURCE_VERIFIED: {
      label: 'Provisional (Secondary)',
      bg: 'bg-amber-50',
      text: 'text-amber-700 font-medium',
      border: 'border-amber-200',
      dot: 'bg-amber-500',
    },
    HISTORICAL_PATTERN: {
      label: 'Historical Pattern',
      bg: 'bg-slate-100',
      text: 'text-slate-600 font-medium',
      border: 'border-slate-200',
      dot: 'bg-slate-400',
    },
    UNVERIFIED: {
      label: 'Unverified',
      bg: 'bg-red-50',
      text: 'text-red-700 font-medium',
      border: 'border-red-200',
      dot: 'bg-red-500',
    },
  };

  const config = configs[normalized] || {
    label: status.replace(/_/g, ' '),
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px] gap-1.5',
    md: 'px-2.5 py-1 text-xs gap-1.5',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border tracking-wide uppercase',
        config.bg,
        config.text,
        config.border,
        sizes[size],
        className
      )}
    >
      <span className={clsx('h-1.5 w-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  );
};
