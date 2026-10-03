import React, { useState } from 'react';
import Link from 'next/link';
import { Opportunity } from '@/types';
import { StatusBadge } from './StatusBadge';
import { SourceBadge } from './SourceBadge';
import { DeadlineCard } from './DeadlineCard';
import { EligibilityCard } from './EligibilityCard';
import { Button } from '../ui/Button';
import {
  Building2,
  Calendar,
  FileCheck,
  Award,
  ArrowLeft,
  ExternalLink,
  Plus,
  Check,
  CheckCircle2,
  ShieldCheck,
  Users,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { mockStudent } from '@/mock/student';

export interface OpportunityDetailProps {
  opportunity: Opportunity;
  onAddToPlan?: (opp: Opportunity) => void;
  isAddedToPlan?: boolean;
}

export const OpportunityDetail: React.FC<OpportunityDetailProps> = ({
  opportunity,
  onAddToPlan,
  isAddedToPlan = false,
}) => {
  const [eligibilityChecked, setEligibilityChecked] = useState(false);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back Button & Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Opportunities</span>
        </Link>

        <div className="flex items-center gap-2">
          {onAddToPlan && (
            <Button
              variant={isAddedToPlan ? 'subtle' : 'outline'}
              size="sm"
              onClick={() => onAddToPlan(opportunity)}
              leftIcon={isAddedToPlan ? <Check className="h-4 w-4 text-emerald-600" /> : <Plus className="h-4 w-4" />}
            >
              {isAddedToPlan ? 'Saved in My Tasks' : 'Add to My Tasks'}
            </Button>
          )}

          <a
            href={opportunity.official_source_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ExternalLink className="h-3.5 w-3.5" />}
            >
              Official Website
            </Button>
          </a>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full border border-primary-100">
              {opportunity.type}
            </span>
            <StatusBadge status={opportunity.status} size="md" />
          </div>

          <SourceBadge
            authority={opportunity.authority}
            sourceUrl={opportunity.official_source_url}
            lastVerified={opportunity.last_verified}
            level={opportunity.source_level}
            minimal
          />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {opportunity.title}
          </h1>
          {opportunity.subtitle && (
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              {opportunity.subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-slate-400" />
            <span>Authority: <strong className="text-slate-700">{opportunity.authority}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-slate-400" />
            <span>Scope: <strong className="text-slate-700">{opportunity.scope}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-slate-400" />
            <span>Academic Cycle: <strong className="text-slate-700">{opportunity.schedule.academic_year || '2026-27'}</strong></span>
          </div>
        </div>
      </div>

      {/* DEADLINE INTELLIGENCE TOP CARD */}
      <DeadlineCard
        schedule={opportunity.schedule}
        extensionStatus={opportunity.extension_status}
        historicalPattern={opportunity.historical_extension_pattern}
        lastVerified={opportunity.last_verified}
      />

      {/* QUICK ELIGIBILITY CHECK FOR STUDENT */}
      <div className="bg-gradient-to-r from-primary-900 to-slate-900 rounded-2xl p-6 text-white space-y-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary-300 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary-400" />
              Automated Student Profile Matching
            </span>
            <h3 className="text-lg font-bold">
              Check Your Eligibility (Ridham Patel • B.Tech • ₹3.5L)
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Notice2Action evaluates your percentile, income, stream and domicile against the statutory order.
            </p>
          </div>

          <Button
            variant="secondary"
            className="bg-white text-slate-900 hover:bg-slate-100 self-start sm:self-center shrink-0"
            onClick={() => setEligibilityChecked(!eligibilityChecked)}
          >
            {eligibilityChecked ? 'Hide Matching Analysis' : 'Check My Eligibility'}
          </Button>
        </div>

        {eligibilityChecked && (
          <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs animate-in fade-in">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm space-y-1">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Percentile Threshold Satisfied
              </span>
              <p className="text-slate-300 text-[11px]">
                Your score of 84.5% satisfies the 80th percentile minimum bar.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm space-y-1">
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Income Ceiling Satisfied
              </span>
              <p className="text-slate-300 text-[11px]">
                Family income ₹3,50,000 is comfortably below the ₹6,00,000 ceiling.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Details & Side Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Deep Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Who Can Apply */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary-600" />
              Target Beneficiaries & Levels
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {opportunity.education_levels.map((lvl, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  {lvl}
                </span>
              ))}
            </div>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-5 pt-2">
              {opportunity.target_students.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Eligibility Criteria */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Statutory Eligibility Criteria
            </h3>
            <EligibilityCard eligibility={opportunity.eligibility} />
          </div>

          {/* Financial Benefits */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Award className="h-4 w-4 text-primary-600" />
              Financial Benefits & Coverage
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opportunity.benefits.tuition && (
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Tuition Assistance
                  </span>
                  <p className="text-xs font-semibold text-slate-900">
                    {opportunity.benefits.tuition}
                  </p>
                </div>
              )}

              {opportunity.benefits.hostel && (
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Living / Hostel Grant
                  </span>
                  <p className="text-xs font-semibold text-slate-900">
                    {opportunity.benefits.hostel}
                  </p>
                </div>
              )}

              {opportunity.benefits.books_equipment && (
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Equipment / Book Grant
                  </span>
                  <p className="text-xs font-semibold text-slate-900">
                    {opportunity.benefits.books_equipment}
                  </p>
                </div>
              )}

              {opportunity.benefits.amount && (
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Total Potential Value
                  </span>
                  <p className="text-xs font-semibold text-emerald-800">
                    {opportunity.benefits.amount}
                  </p>
                </div>
              )}
            </div>

            {opportunity.benefits.details && (
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                {opportunity.benefits.details}
              </p>
            )}
          </div>

          {/* How to Apply Steps */}
          {opportunity.application_steps && opportunity.application_steps.length > 0 && (
            <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary-600" />
                How to Apply: Step-by-Step
              </h3>

              <div className="space-y-2.5">
                {opportunity.application_steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/60 text-xs text-slate-700"
                  >
                    <span className="h-5 w-5 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Column: Documents, Sources & Extension Info */}
        <div className="space-y-6">
          {/* Required Documents Card */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-primary-600" />
              Required Documents
            </h3>

            <div className="space-y-2">
              {opportunity.required_documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-100 bg-slate-50 text-xs text-slate-700"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
                  <span className="font-medium">{doc}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 italic">
              Keep original documents ready for physical verification at designated nodal centres.
            </p>
          </div>

          {/* Extension Information Box */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Extension Intelligence
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {opportunity.historical_extension_pattern ||
                'No extension behavior observed. Adhere strictly to the first gazetted cutoff.'}
            </p>
          </div>

          {/* Official Verification & Portals */}
          <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Official Department Sources
            </h3>

            <div className="space-y-2">
              {opportunity.sources.map((s, idx) => (
                <a
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-primary-50/40 hover:border-primary-300 transition-all text-xs text-slate-800 font-medium group"
                >
                  <span className="truncate">{s.label}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary-600 shrink-0" />
                </a>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <div>
                Verification Standard: <strong>{opportunity.source_level}</strong>
              </div>
              <div>
                Last Verified: <strong>{opportunity.last_verified}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
