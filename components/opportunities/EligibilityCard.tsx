import React from 'react';
import { Check, X, Info } from 'lucide-react';
import { EligibilityCriteria, StudentProfile } from '@/types';

export interface EligibilityCardProps {
  eligibility: EligibilityCriteria;
  profile?: StudentProfile;
  className?: string;
}

export const EligibilityCard: React.FC<EligibilityCardProps> = ({
  eligibility,
  profile,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-3">
        {eligibility.academic && (
          <div className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white">
            <div className="mt-0.5 rounded-full p-1 bg-emerald-100 text-emerald-700 shrink-0">
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-slate-900 block text-[13px] mb-0.5">
                Academic Criteria
              </span>
              <p className="text-slate-600 leading-relaxed">{eligibility.academic}</p>
            </div>
          </div>
        )}

        {eligibility.income && (
          <div className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white">
            <div className="mt-0.5 rounded-full p-1 bg-emerald-100 text-emerald-700 shrink-0">
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-slate-900 block text-[13px] mb-0.5">
                Family Income Ceiling
              </span>
              <p className="text-slate-600 leading-relaxed">{eligibility.income}</p>
            </div>
          </div>
        )}

        {eligibility.domicile && (
          <div className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 bg-white">
            <div className="mt-0.5 rounded-full p-1 bg-emerald-100 text-emerald-700 shrink-0">
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-slate-900 block text-[13px] mb-0.5">
                Domicile & Residence
              </span>
              <p className="text-slate-600 leading-relaxed">{eligibility.domicile}</p>
            </div>
          </div>
        )}

        {eligibility.exclusions && (
          <div className="flex items-start gap-3 p-3.5 rounded-xl border border-rose-200 bg-rose-50/50">
            <div className="mt-0.5 rounded-full p-1 bg-rose-100 text-rose-700 shrink-0">
              <X className="h-3.5 w-3.5 stroke-[2.5]" />
            </div>
            <div className="text-xs">
              <span className="font-semibold text-rose-900 block text-[13px] mb-0.5">
                Disqualifications / Ineligibility
              </span>
              <p className="text-rose-800 leading-relaxed">{eligibility.exclusions}</p>
            </div>
          </div>
        )}
      </div>

      {eligibility.documents_note && (
        <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
          <Info className="h-4 w-4 text-slate-400 shrink-0" />
          <span>{eligibility.documents_note}</span>
        </div>
      )}
    </div>
  );
};
