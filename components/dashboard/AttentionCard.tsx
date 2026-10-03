import React from 'react';
import Link from 'next/link';
import { Opportunity } from '@/types';
import { StatusBadge } from '../opportunities/StatusBadge';
import { ArrowRight, Clock, AlertTriangle, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export interface AttentionCardProps {
  opportunity: Opportunity;
  onTrack?: (id: string) => void;
}

export const AttentionCard: React.FC<AttentionCardProps> = ({
  opportunity,
  onTrack,
}) => {
  const isExtended = opportunity.status === 'EXTENDED';
  const isNotAnnounced = opportunity.status === 'NOT_ANNOUNCED';
  const isConflicting = opportunity.status === 'CONFLICTING';
  const isUpcoming = opportunity.status === 'UPCOMING';

  const getBorderAccent = () => {
    if (isExtended) return 'border-l-4 border-l-amber-500 bg-amber-50/10';
    if (isNotAnnounced) return 'border-l-4 border-l-slate-400 bg-slate-50/40';
    if (isConflicting) return 'border-l-4 border-l-rose-500 bg-rose-50/10';
    if (isUpcoming) return 'border-l-4 border-l-blue-500 bg-blue-50/10';
    return 'border-l-4 border-l-emerald-500 bg-emerald-50/10';
  };

  const deadline =
    opportunity.schedule.final_deadline ||
    opportunity.schedule.extended_deadline ||
    opportunity.schedule.original_deadline ||
    'Not Announced';

  return (
    <div
      className={`rounded-2xl border border-border p-5 transition-all duration-200 hover:shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${getBorderAccent()}`}
    >
      <div className="space-y-2 max-w-xl">
        <div className="flex items-center gap-2 flex-wrap">
          <StatusBadge status={opportunity.status} size="sm" />
          <span className="text-xs text-slate-500 font-medium">
            {opportunity.authority}
          </span>
        </div>

        <div>
          <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {opportunity.title}
          </h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            {isNotAnnounced
              ? 'Official schedule not announced by the board. Avoid unofficial dates.'
              : isExtended
              ? `Application deadline approaching. Extended to ${deadline}.`
              : opportunity.subtitle || 'Active official administrative window requiring student action.'}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs pt-1 flex-wrap">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>{isNotAnnounced ? 'Status: Unannounced' : `Deadline: ${deadline}`}</span>
          </div>

          {opportunity.schedule.days_remaining !== undefined && opportunity.schedule.days_remaining !== null && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <Clock className="h-3 w-3" />
              {opportunity.schedule.days_remaining} days left
            </span>
          )}

          {opportunity.benefits.amount && (
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {opportunity.benefits.amount}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 sm:self-center">
        <Link href={`/opportunities/${opportunity.id}`}>
          <Button
            variant={isExtended ? 'primary' : 'outline'}
            size="sm"
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
          >
            {isNotAnnounced ? 'Track Update' : 'View Details'}
          </Button>
        </Link>
      </div>
    </div>
  );
};
