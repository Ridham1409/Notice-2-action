import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType, Opportunity } from '@/types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ThinkingIndicator } from './ThinkingIndicator';
import { quickPrompts } from '@/mock/chat';
import { aiService } from '@/services/aiService';
import { actionService } from '@/services/actionService';
import { Sparkles, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';

export const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');
  const [stepIndex, setStepIndex] = useState(0);
  const [plannedOppIds, setPlannedOppIds] = useState<string[]>([]);
  const [activeNotice, setActiveNotice] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(aiService.getInitialConversation());
    const initialPlans = actionService.getActionPlan();
    setPlannedOppIds(initialPlans.map((p) => p.opportunityId).filter(Boolean) as string[]);

    // Automatically detect recent uploaded notice for document questions
    import('@/services/noticeService').then(({ noticeService }) => {
      noticeService.getRecentNotices().then((list) => {
        if (list && list.length > 0) {
          setActiveNotice(list[0]);
        }
      });
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessageType = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setStepIndex(0);

    const noticeContext = activeNotice
      ? `Notice Title: ${activeNotice.title}\nAuthority: ${activeNotice.authority}\nSummary: ${activeNotice.aiSummary}\nDates: ${JSON.stringify(activeNotice.importantDates)}\nRequired Documents: ${JSON.stringify(activeNotice.requiredDocuments || [])}\nActions: ${JSON.stringify(activeNotice.actionItems)}`
      : undefined;

    try {
      const response = await aiService.queryAssistant(
        text,
        (step) => {
          setThinkingStep(step);
          setStepIndex((curr) => Math.min(curr + 1, 3));
        },
        messages,
        noticeContext
      );
      setMessages((prev) => [...prev, response]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToPlan = (opp: Opportunity) => {
    actionService.addItem({
      title: `Apply for ${opp.title}`,
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      type: opp.type,
      deadline: opp.schedule.final_deadline || opp.schedule.extended_deadline || 'Upcoming',
      priority: opp.urgencyLevel === 'high' ? 'HIGH' : 'MEDIUM',
      status: 'PENDING',
      categoryTimeframe: 'TODAY',
      documents: opp.required_documents.slice(0, 4).map((d) => ({ name: d, checked: false })),
      notes: `Added from Notice2Action AI Assistant. Target benefit: ${
        opp.benefits.amount || opp.benefits.tuition || 'Verified state support'
      }`,
      officialUrl: opp.official_source_url,
    });
    setPlannedOppIds((prev) => [...prev, opp.id]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-4xl mx-auto bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-slate-50/70 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-sm shadow-blue-500/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Ask Notice2Action
            </h2>
            <p className="text-[11px] text-slate-500">
              Ask about scholarships, exams, admissions, or any Gujarat notice
            </p>
          </div>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center ring-8 ring-primary-50/50">
              <MessageSquare className="h-8 w-8 stroke-[1.75]" />
            </div>
            <div className="max-w-md">
              <h3 className="text-lg font-semibold text-slate-900">
                What do you need to figure out?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Ask a question, upload a notice, or tell us about your student profile to turn
                government circulars into concrete action steps.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg pt-4 text-left">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 hover:border-primary-400 hover:bg-primary-50/40 hover:text-primary-900 transition-all group"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onAddToPlan={handleAddToPlan}
                plannedOppIds={plannedOppIds}
              />
            ))}

            {isLoading && (
              <ThinkingIndicator currentStep={thinkingStep} stepIndex={stepIndex} />
            )}

            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Quick Prompt Pills when in conversation */}
      {messages.length > 0 && !isLoading && (
        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Try:
          </span>
          {quickPrompts.slice(0, 4).map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(qp)}
              className="text-xs text-slate-600 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 rounded-full px-3 py-1 whitespace-nowrap transition-colors shrink-0"
            >
              {qp}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 sm:p-4 border-t border-border bg-slate-50/30 shrink-0">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};
