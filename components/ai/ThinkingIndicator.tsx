import React from 'react';
import { Sparkles, Check, Loader2, Circle } from 'lucide-react';

export interface ThinkingIndicatorProps {
  currentStep?: string;
  stepIndex?: number;
}

export const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({
  currentStep = 'Verifying official Gujarat education database...',
  stepIndex = 1,
}) => {
  const steps = [
    'Reading your student profile',
    'Querying verified state databases',
    'Verifying official government circulars',
    'Synthesizing deadline intelligence',
  ];

  return (
    <div className="flex gap-3 max-w-2xl animate-in fade-in duration-200">
      <div className="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
        <Sparkles className="h-4 w-4" />
      </div>

      <div className="flex-1 bg-surface rounded-2xl border border-border p-4 shadow-subtle space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary-700">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-primary-600" />
          <span>Notice2Action Agent is checking...</span>
        </div>

        <div className="space-y-2">
          {steps.map((text, idx) => {
            const isCompleted = idx < stepIndex;
            const isCurrent = idx === stepIndex;

            return (
              <div key={idx} className="flex items-center gap-2 text-xs">
                {isCompleted ? (
                  <div className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5 stroke-[3]" />
                  </div>
                ) : isCurrent ? (
                  <div className="h-4 w-4 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 animate-pulse">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                  </div>
                ) : (
                  <div className="h-4 w-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                    <Circle className="h-2.5 w-2.5 stroke-[1.5]" />
                  </div>
                )}
                <span
                  className={
                    isCompleted
                      ? 'text-slate-500'
                      : isCurrent
                      ? 'text-slate-900 font-medium'
                      : 'text-slate-400'
                  }
                >
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
