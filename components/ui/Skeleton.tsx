import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Skeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div
    className={twMerge(
      clsx('animate-pulse rounded-md bg-slate-200/80', className)
    )}
  />
);

export const OpportunityCardSkeleton: React.FC = () => (
  <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
    <div className="flex items-start justify-between">
      <div className="space-y-2 flex-1">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3.5 w-1/2" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
    <div className="space-y-2 pt-2">
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="h-3.5 w-5/6" />
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-border">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-8 w-24 rounded-lg" />
    </div>
  </div>
);

export const DashboardCardSkeleton: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-surface rounded-xl border border-border p-5 space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
        <Skeleton className="h-7 w-16" />
        <Skeleton className="h-4 w-28" />
      </div>
    ))}
  </div>
);

export const ChatSkeleton: React.FC = () => (
  <div className="flex gap-3 max-w-2xl">
    <Skeleton className="h-8 w-8 rounded-full shrink-0" />
    <div className="flex-1 space-y-2.5">
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
      <div className="mt-3 p-4 rounded-xl border border-border bg-slate-50 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  </div>
);
