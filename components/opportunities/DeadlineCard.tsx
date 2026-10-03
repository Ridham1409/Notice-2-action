import React from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';
import { DeadlineSchedule, ExtensionStatus } from '@/types';
import { StatusBadge } from './StatusBadge';

export interface DeadlineCardProps {
  schedule: DeadlineSchedule;
  extensionStatus: ExtensionStatus;
  historicalPattern?: string;
  lastVerified?: string;
  className?: string;
}

export const DeadlineCard: React.FC<DeadlineCardProps> = ({
  schedule,
  extensionStatus,
  historicalPattern,
  lastVerified = '03 Oct 2026',
  className = '',
}) => {
  const isExtended = extensionStatus === 'CONFIRMED_EXTENSION' && schedule.extended_deadline;
  const isNotAnnounced = schedule.date_status === 'NOT_ANNOUNCED';

  return (
    <div
      className={`rounded-xl border border-border bg-gradient-to-b from-white to-slate-50/50 p-4 sm:p-5 shadow-sm space-y-4 ${className}`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-border/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary-50 text-primary-600">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Deadline Intelligence
            </span>
            <h4 className="text-sm font-semibold text-slate-900">Application & Schedule</h4>
          </div>
        </div>
        <StatusBadge status={schedule.date_status} size="sm" />
      </div>

      {isNotAnnounced ? (
        <div className="p-3.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
            <Clock className="h-4 w-4 text-slate-500" />
            <span>Dates Not Officially Announced</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {historicalPattern ||
              'No official cycle notice has been published by the governing statutory body. Dates will appear once gazetted.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Main Cutoff Display */}
          <div className="flex flex-wrap items-baseline justify-between gap-2 p-3.5 rounded-lg bg-white border border-slate-200">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isExtended ? 'Current Extended Deadline' : 'Active Application Deadline'}
              </span>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
                {schedule.final_deadline || schedule.extended_deadline || schedule.original_deadline || 'Open'}
              </div>
              {isExtended && schedule.original_deadline && (
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <span>Extended from:</span>
                  <span className="line-through font-medium text-slate-400">
                    {schedule.original_deadline}
                  </span>
                </div>
              )}
            </div>

            {schedule.days_remaining !== undefined && schedule.days_remaining !== null && (
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  <Clock className="h-3 w-3" />
                  {schedule.days_remaining} days left
                </span>
              </div>
            )}
          </div>

          {/* Extension Confirmation & Verification Notice */}
          <div className="space-y-2">
            {extensionStatus === 'CONFIRMED_EXTENSION' ? (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80 text-emerald-800 text-xs">
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                <div>
                  <span className="font-semibold">Extension Confirmed:</span>{' '}
                  <span>This cutoff is backed by a verified departmental order / corrigendum.</span>
                </div>
              </div>
            ) : extensionStatus === 'HISTORICAL_EXTENSION_PATTERN' ? (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-amber-800 text-xs">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <span className="font-semibold">Important Notice:</span>{' '}
                  <span>
                    Historical extensions exist, but no current extension has been officially confirmed.
                    Submit all forms before the published deadline.
                  </span>
                </div>
              </div>
            ) : null}

            {schedule.verification_deadline && (
              <div className="flex items-center justify-between text-xs py-1.5 px-2 bg-slate-50 rounded border border-slate-200 text-slate-600">
                <span className="font-medium text-slate-700">Help Centre Verification:</span>
                <span className="font-semibold text-slate-900">{schedule.verification_deadline}</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] text-slate-500">
        <span>Source standard: Official primary first</span>
        <span>
          Last verified: <strong className="text-slate-700 font-semibold">{lastVerified}</strong>
        </span>
      </div>
    </div>
  );
};
