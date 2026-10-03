import React from 'react';
import Link from 'next/link';
import { ChatMessage as ChatMessageType, Opportunity } from '@/types';
import { User, Sparkles, Calendar, ArrowRight, Plus, Check } from 'lucide-react';
import { StatusBadge } from '../opportunities/StatusBadge';
import { SourceCitation } from './SourceCitation';
import { Button } from '../ui/Button';

export interface ChatMessageProps {
  message: ChatMessageType;
  onAddToPlan?: (opportunity: Opportunity) => void;
  plannedOppIds?: string[];
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onAddToPlan,
  plannedOppIds = [],
}) => {
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div className="flex gap-3 justify-end animate-in fade-in duration-150">
        <div className="max-w-xl rounded-2xl rounded-tr-sm bg-slate-900 text-white px-4 py-3 text-sm leading-relaxed shadow-sm">
          <p>{message.content}</p>
          <span className="block text-[10px] text-slate-400 text-right mt-1.5">
            {message.timestamp}
          </span>
        </div>
        <div className="h-8 w-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-semibold">
          RP
        </div>
      </div>
    );
  }

  const [showAllOpps, setShowAllOpps] = React.useState(false);
  const structured = message.structuredData;
  const allOpps = structured?.opportunities || [];
  const opps = showAllOpps ? allOpps : allOpps.slice(0, 3);

  return (
    <div className="flex gap-3 max-w-3xl animate-in fade-in duration-150">
      <div className="h-8 w-8 rounded-full bg-primary-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/20">
        <Sparkles className="h-4 w-4" />
      </div>

      <div className="flex-1 space-y-3.5">
        <div className="bg-surface rounded-2xl rounded-tl-sm border border-border p-4 sm:p-5 shadow-card space-y-3">
          <p className="text-sm text-slate-800 leading-relaxed font-normal whitespace-pre-line">
            {message.content}
          </p>

          {/* Structured Opportunity Cards */}
          {opps.length > 0 && (
            <div className="space-y-3 pt-2">
              {opps.map((opp) => {
                const score = opp.matchScore ?? 75;
                const isHighMatch = score >= 80;
                const isPlanned = plannedOppIds.includes(opp.id);

                const renderStatusBadge = () => {
                  if (opp.matchReason?.toLowerCase().includes('ineligible') || score < 40) {
                    return (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-rose-100 text-rose-800">
                        🔴 NOT ELIGIBLE
                      </span>
                    );
                  }
                  if (isHighMatch) {
                    return (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        🟢 ELIGIBLE
                      </span>
                    );
                  }
                  if (score >= 50) {
                    return (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-amber-100 text-amber-800">
                        🟡 POTENTIALLY ELIGIBLE
                      </span>
                    );
                  }
                  return (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold uppercase bg-slate-100 text-slate-700">
                      ⚪ NOT ENOUGH INFORMATION
                    </span>
                  );
                };

                return (
                  <div
                    key={opp.id}
                    className={`rounded-xl border p-4 transition-all duration-150 ${
                      isHighMatch
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {renderStatusBadge()}
                          <StatusBadge status={opp.status} size="sm" />
                        </div>
                        <h4 className="text-base font-semibold text-slate-900">
                          {opp.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {opp.subtitle || opp.authority}
                        </p>
                      </div>

                      {opp.schedule.final_deadline || opp.schedule.extended_deadline ? (
                        <div className="text-right shrink-0">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">
                            Deadline
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {opp.schedule.final_deadline || opp.schedule.extended_deadline}
                          </span>
                        </div>
                      ) : null}
                    </div>

                    {/* Why you may match */}
                    {opp.matchReason && (
                      <div className="mt-3 text-xs bg-white/80 p-2.5 rounded-lg border border-slate-200 text-slate-700">
                        <span className="font-semibold text-slate-900 block mb-1">
                          Eligibility:
                        </span>
                        <p className="text-slate-600 leading-relaxed text-[11px]">
                          {opp.matchReason}
                        </p>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="mt-3.5 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span>
                          Cycle: <strong>{opp.schedule.academic_year || '2026-27'}</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {onAddToPlan && (
                          <Button
                            variant={isPlanned ? 'subtle' : 'outline'}
                            size="sm"
                            onClick={() => onAddToPlan(opp)}
                          >
                            {isPlanned ? (
                              <>
                                <Check className="h-3 w-3 mr-1 text-emerald-600" />
                                In Tasks
                              </>
                            ) : (
                              <>
                                <Plus className="h-3 w-3 mr-1" />
                                Save Task
                              </>
                            )}
                          </Button>
                        )}

                        <Link href={`/opportunities/${opp.id}`}>
                          <Button
                            variant="primary"
                            size="sm"
                            rightIcon={<ArrowRight className="h-3 w-3" />}
                          >
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}

              {!showAllOpps && allOpps.length > 3 && (
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAllOpps(true)}
                    className="text-xs text-primary-600 font-semibold hover:text-primary-800 hover:underline"
                  >
                    Show {allOpps.length - 3} more opportunities ↓
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Sources and Last Verified timestamp */}
          {structured?.sources && (
            <SourceCitation
              sources={structured.sources}
              lastVerified={structured.lastVerified}
              disclaimer={structured.disclaimer}
            />
          )}
        </div>

        <span className="block text-[10px] text-slate-400 pl-1">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
};
