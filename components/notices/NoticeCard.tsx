import React from 'react';
import { NoticeAnalysisResult } from '@/types';
import { FileText, ArrowRight, Calendar, Building2 } from 'lucide-react';
import { StatusBadge } from '../opportunities/StatusBadge';
import { Button } from '../ui/Button';

export interface NoticeCardProps {
  notice: NoticeAnalysisResult;
  onSelect: (notice: NoticeAnalysisResult) => void;
  isSelected?: boolean;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({
  notice,
  onSelect,
  isSelected = false,
}) => {
  return (
    <div
      onClick={() => onSelect(notice)}
      className={`group rounded-xl border p-4 sm:p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
        isSelected
          ? 'border-primary-500 bg-primary-50/20 shadow-md ring-1 ring-primary-500/30'
          : 'border-border bg-white hover:border-slate-300 hover:shadow-card'
      }`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                {notice.fileName}
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">
                {notice.fileSize}
              </span>
            </div>
          </div>
          <StatusBadge status={notice.status} size="sm" />
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {notice.title}
        </p>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <Building2 className="h-3 w-3 text-slate-400 shrink-0" />
          <span className="truncate">{notice.authority}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Calendar className="h-3 w-3" />
          <span>{new Date(notice.uploadedAt).toLocaleDateString()}</span>
        </div>

        <Button
          variant={isSelected ? 'primary' : 'outline'}
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(notice);
          }}
          rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
        >
          {isSelected ? 'Viewing' : 'Analyze'}
        </Button>
      </div>
    </div>
  );
};
