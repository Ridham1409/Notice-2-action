import React from 'react';
import Link from 'next/link';
import { ActionPlanItem } from '@/types';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export interface ActionCardProps {
  item: ActionPlanItem;
  onToggleComplete: (id: string) => void;
  onToggleDoc: (id: string, docIndex: number) => void;
  onDelete: (id: string) => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  item,
  onToggleComplete,
  onToggleDoc,
  onDelete,
}) => {
  const isCompleted = item.status === 'COMPLETED';

  const priorityBadges = {
    HIGH: { label: 'High Priority', variant: 'danger' as const },
    MEDIUM: { label: 'Medium Priority', variant: 'warning' as const },
    LOW: { label: 'Low Priority', variant: 'info' as const },
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 p-5 space-y-4 ${
        isCompleted
          ? 'bg-slate-50/70 border-slate-200 opacity-80'
          : 'bg-white border-border shadow-card hover:border-slate-300'
      }`}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggleComplete(item.id)}
            className={`mt-0.5 h-5 w-5 rounded-lg border flex items-center justify-center transition-all ${
              isCompleted
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'border-slate-300 hover:border-emerald-500 bg-white'
            }`}
            title={isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
          >
            {isCompleted && <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />}
          </button>

          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Badge variant={priorityBadges[item.priority].variant} size="sm">
                {priorityBadges[item.priority].label}
              </Badge>

              {item.opportunityTitle && (
                <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {item.opportunityTitle}
                </span>
              )}
            </div>

            <h4
              className={`text-base font-semibold leading-snug ${
                isCompleted ? 'text-slate-500 line-through' : 'text-slate-900'
              }`}
            >
              {item.title}
            </h4>
          </div>
        </div>

        <button
          onClick={() => onDelete(item.id)}
          className="text-slate-300 hover:text-red-600 p-1 rounded-md transition-colors"
          title="Remove from Action Plan"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Deadline and Time Remaining */}
      {item.deadline && (
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            <span>
              Target: <strong className="text-slate-900 font-semibold">{item.deadline}</strong>
            </span>
          </div>

          {item.timeRemainingText && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <Clock className="h-3 w-3" />
              {item.timeRemainingText}
            </span>
          )}
        </div>
      )}

      {/* Documents Checklist */}
      {item.documents && item.documents.length > 0 && (
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
            <FileCheck className="h-3.5 w-3.5" />
            Required Documents ({item.documents.filter((d) => d.checked).length}/{item.documents.length})
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {item.documents.map((doc, idx) => (
              <div
                key={idx}
                onClick={() => onToggleDoc(item.id, idx)}
                className={`p-2 rounded-lg border text-xs flex items-center gap-2 cursor-pointer transition-colors ${
                  doc.checked
                    ? 'border-emerald-200 bg-emerald-50/50 text-slate-600'
                    : 'border-slate-200 bg-slate-50/60 text-slate-800 hover:border-slate-300'
                }`}
              >
                <div
                  className={`h-3.5 w-3.5 rounded border flex items-center justify-center shrink-0 ${
                    doc.checked
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {doc.checked && <CheckCircle2 className="h-3 w-3 stroke-[3]" />}
                </div>
                <span className={`truncate ${doc.checked ? 'line-through text-slate-400' : 'font-medium'}`}>
                  {doc.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes & Actions Bar */}
      {item.notes && (
        <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
          {item.notes}
        </p>
      )}

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        {item.opportunityId ? (
          <Link
            href={`/opportunities/${item.opportunityId}`}
            className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors"
          >
            View Opportunity Details →
          </Link>
        ) : <span />}

        {item.officialUrl && (
          <a
            href={item.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-medium"
          >
            <span>Official Portal</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
};
