import React from 'react';
import Link from 'next/link';
import { Opportunity } from '@/types';
import { StatusBadge } from './StatusBadge';
import { SourceBadge } from './SourceBadge';
import { Calendar, ArrowRight, Building, Award, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

export interface OpportunityCardProps {
  opportunity: Opportunity;
  onAddToPlan?: (opportunity: Opportunity) => void;
  isAddedToPlan?: boolean;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  onAddToPlan,
  isAddedToPlan = false,
}) => {
  const deadlineText =
    opportunity.schedule.final_deadline ||
    opportunity.schedule.extended_deadline ||
    opportunity.schedule.original_deadline ||
    'Not Announced';

  const typeLabels: Record<string, string> = {
    scholarship: 'Scholarship',
    exam: 'Exam',
    admission: 'Admission',
    scheme: 'Scheme',
  };

  const benefitText =
    opportunity.benefits.amount ||
    opportunity.benefits.tuition ||
    opportunity.benefits.total_assistance ||
    (opportunity.type === 'admission' ? 'Centralized Seat Allotment' : null);

  return (
    <div className="group relative bg-surface rounded-2xl border border-border transition-all duration-200 hover:shadow-cardHover hover:border-slate-300 flex flex-col justify-between p-5 sm:p-6">
      <div className="space-y-3">
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[11px] font-semibold text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-100">
            {typeLabels[opportunity.type] || 'Opportunity'}
          </span>
          <StatusBadge status={opportunity.status} size="sm" />
        </div>

        {/* Title & Authority */}
        <div>
          <Link
            href={`/opportunities/${opportunity.id}`}
            className="block text-base font-semibold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1"
          >
            {opportunity.title}
          </Link>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
            {opportunity.authority}
          </p>
        </div>

        {/* Why you qualify / Brief */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {opportunity.matchReason ||
            opportunity.eligibility.academic ||
            opportunity.subtitle ||
            'Eligible for Gujarat students matching educational requirements.'}
        </p>

        {/* Benefits Highlight */}
        {benefitText && (
          <div className="flex items-center gap-2 text-xs bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 text-slate-700 font-medium">
            <Award className="h-3.5 w-3.5 text-primary-600 shrink-0" />
            <span className="truncate">Benefit: {benefitText}</span>
          </div>
        )}
      </div>

      {/* Footer Area with Deadline & Action Buttons */}
      <div className="mt-4 pt-3.5 border-t border-border flex items-center justify-between gap-2">
        <div className="text-xs text-slate-500">
          <span className="text-[11px] text-slate-400 block">Deadline</span>
          <span className="font-semibold text-slate-800 line-clamp-1">{deadlineText}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {onAddToPlan && (
            <Button
              variant={isAddedToPlan ? 'subtle' : 'outline'}
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                onAddToPlan(opportunity);
              }}
              title={isAddedToPlan ? 'Saved in My Tasks' : 'Save to My Tasks'}
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{isAddedToPlan ? 'Saved' : 'Save'}</span>
            </Button>
          )}

          <Link href={`/opportunities/${opportunity.id}`}>
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            >
              View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
