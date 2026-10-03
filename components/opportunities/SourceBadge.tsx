import React from 'react';
import { CheckCircle2, AlertTriangle, History, HelpCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { SourceLevel } from '@/types';
import { clsx } from 'clsx';

export interface SourceBadgeProps {
  authority?: string;
  sourceUrl?: string;
  lastVerified?: string;
  level?: SourceLevel;
  minimal?: boolean;
  className?: string;
}

export const SourceBadge: React.FC<SourceBadgeProps> = ({
  authority = 'Government of Gujarat',
  sourceUrl,
  lastVerified = 'Oct 3, 2026',
  level = 'OFFICIAL_PRIMARY',
  minimal = false,
  className = '',
}) => {
  const getLevelConfig = () => {
    switch (level) {
      case 'OFFICIAL_PRIMARY':
        return {
          icon: CheckCircle2,
          text: 'Official Source',
          badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          iconColor: 'text-emerald-600',
        };
      case 'OFFICIAL_SECONDARY':
        return {
          icon: ShieldCheck,
          text: 'Official Secondary',
          badgeClass: 'bg-blue-50 text-blue-800 border-blue-200',
          iconColor: 'text-blue-600',
        };
      case 'REPUTABLE_SECONDARY':
        return {
          icon: AlertTriangle,
          text: 'Secondary Verified',
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
          iconColor: 'text-amber-600',
        };
      case 'HISTORICAL':
        return {
          icon: History,
          text: 'Historical Precedent',
          badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
          iconColor: 'text-slate-500',
        };
      default:
        return {
          icon: HelpCircle,
          text: 'Needs Verification',
          badgeClass: 'bg-rose-50 text-rose-800 border-rose-200',
          iconColor: 'text-rose-500',
        };
    }
  };

  const { icon: Icon, text, badgeClass, iconColor } = getLevelConfig();

  if (minimal) {
    return (
      <span
        className={clsx(
          'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] font-medium tracking-tight',
          badgeClass,
          className
        )}
      >
        <Icon className={clsx('h-3 w-3 shrink-0', iconColor)} />
        <span>{text}</span>
      </span>
    );
  }

  return (
    <div
      className={clsx(
        'flex flex-wrap items-center justify-between gap-2.5 rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2 text-xs text-slate-600',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={clsx(
            'inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-medium',
            badgeClass
          )}
        >
          <Icon className={clsx('h-3 w-3 shrink-0', iconColor)} />
          {text}
        </span>
        <span className="font-medium text-slate-900 truncate max-w-[200px]">
          {authority}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {lastVerified && (
          <span className="text-[11px] text-slate-500">
            Verified: <strong className="font-semibold text-slate-700">{lastVerified}</strong>
          </span>
        )}
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-primary-600 hover:text-primary-800 transition-colors"
          >
            <span>Official Portal</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
};
