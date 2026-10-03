import React, { useState } from 'react';
import { NoticeAnalysisResult } from '@/types';
import {
  FileText,
  Calendar,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  ExternalLink,
  Plus,
  Check,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { StatusBadge } from '../opportunities/StatusBadge';
import { Button } from '../ui/Button';

export interface NoticeAnalysisProps {
  notice: NoticeAnalysisResult;
  onAddToPlan: (notice: NoticeAnalysisResult) => void;
  isAddedToPlan?: boolean;
}

export const NoticeAnalysis: React.FC<NoticeAnalysisProps> = ({
  notice,
  onAddToPlan,
  isAddedToPlan = false,
}) => {
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const toggleAction = (id: string) => {
    setCompletedActions((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-surface rounded-2xl border border-border shadow-card overflow-hidden space-y-6 p-5 sm:p-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full border border-primary-100 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-primary-600" />
              Notice Analysis
            </span>
            <StatusBadge status={notice.status} size="sm" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {notice.title}
          </h2>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700">
              {notice.fileName}
            </span>
            <span>•</span>
            <span>{notice.authority}</span>
          </div>
        </div>

        <Button
          variant={isAddedToPlan ? 'subtle' : 'primary'}
          onClick={() => onAddToPlan(notice)}
          leftIcon={isAddedToPlan ? <Check className="h-4 w-4 text-emerald-600" /> : <Plus className="h-4 w-4" />}
          className="shrink-0"
        >
          {isAddedToPlan ? 'Saved in My Tasks' : 'Add to My Tasks'}
        </Button>
      </div>

      {/* AI Summary */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-primary-600" />
          Summary: What&apos;s Changed?
        </span>
        <p className="text-sm text-slate-800 leading-relaxed font-normal">
          {notice.aiSummary}
        </p>
      </div>

      {/* IMPORTANT DATES GRID */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary-600" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Important Dates
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {notice.importantDates.map((d, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 shadow-subtle"
            >
              <div>
                <span className="text-xs text-slate-500 block">{d.label}</span>
                <span className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 block">
                  {d.date}
                </span>
              </div>
              <StatusBadge status={d.status} size="sm" />
            </div>
          ))}
        </div>
      </div>

      {/* REQUIRED DOCUMENTS */}
      {notice.requiredDocuments && notice.requiredDocuments.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Documents Needed ({notice.requiredDocuments.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {notice.requiredDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-slate-200 bg-white flex items-center gap-2.5 text-xs text-slate-800 shadow-subtle"
              >
                <div className="h-2 w-2 rounded-full bg-primary-600 shrink-0" />
                <span className="font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ACTION ITEMS CHECKLIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              What You Need To Do
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Check off completed steps
          </span>
        </div>

        <div className="space-y-2">
          {notice.actionItems.map((item) => {
            const isChecked = completedActions.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleAction(item.id)}
                className={`p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer select-none ${
                  isChecked
                    ? 'border-emerald-200 bg-emerald-50/40 text-slate-500 line-through'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    isChecked
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <div className="flex-1 text-xs sm:text-sm">
                  <p className="font-medium text-slate-900 leading-snug">
                    {item.task}
                  </p>
                  {item.suggestedDeadline && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-amber-700 font-semibold mt-1">
                      <Clock className="h-3 w-3" />
                      Suggested Cutoff: {item.suggestedDeadline}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* IMPORTANT WARNING BOX */}
      {notice.warnings.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span>Important Advisory</span>
          </div>
          <ul className="space-y-1.5 text-xs text-amber-900/90 leading-relaxed pl-5 list-disc">
            {notice.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* SOURCE INFORMATION */}
      <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>
            Source: <strong className="text-slate-800">{notice.sourceInfo.authorityName}</strong>
          </span>
          <span>•</span>
          <span>
            Verified: <strong className="text-slate-700">{notice.sourceInfo.lastVerified}</strong>
          </span>
        </div>

        <a
          href={notice.sourceInfo.officialPortalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-primary-600 hover:text-primary-800 transition-colors"
        >
          <span>Open Official Department Portal</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
};
