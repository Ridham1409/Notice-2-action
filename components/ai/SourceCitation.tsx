import React from 'react';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { SourceReference } from '@/types';

export interface SourceCitationProps {
  sources?: SourceReference[];
  lastVerified?: string;
  disclaimer?: string;
}

export const SourceCitation: React.FC<SourceCitationProps> = ({
  sources = [],
  lastVerified = 'Oct 3, 2026',
  disclaimer,
}) => {
  return (
    <div className="mt-3.5 pt-3 border-t border-border/80 text-xs text-slate-500 space-y-2">
      {disclaimer && (
        <p className="text-[11px] text-slate-500 italic leading-relaxed">
          {disclaimer}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 text-slate-600">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span className="font-medium text-slate-700">Official Citations:</span>
          <div className="flex flex-wrap items-center gap-2">
            {sources.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-800 underline underline-offset-2"
              >
                <span>{s.label}</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-slate-400">
          Last verified: <strong className="text-slate-600">{lastVerified}</strong>
        </div>
      </div>
    </div>
  );
};
