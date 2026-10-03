import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Sparkles, CheckSquare, ShieldCheck, AlertCircle } from 'lucide-react';
import { actionService } from '@/services/actionService';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  onOpenConflicts?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
}) => {
  const [actionCount, setActionCount] = useState(0);

  useEffect(() => {
    const actions = actionService.getActionPlan();
    setActionCount(actions.filter((a) => a.status !== 'COMPLETED').length);
  }, []);

  return (
    <header className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-border/70 bg-surface/80 backdrop-blur-sm sticky top-0 z-30">
      <div>
        {title ? (
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">{title}</h1>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-slate-800">Gujarat Education Assistant</span>
            <span>•</span>
            <span>Academic Cycle 2026–27</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Search Shortcut */}
        <Link
          href="/opportunities"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50/70 text-xs text-slate-500 hover:border-slate-300 hover:bg-slate-100 transition-colors"
        >
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span>Search opportunities...</span>
          <kbd className="font-mono text-[10px] bg-white border border-slate-200 rounded px-1.5 py-0.5 text-slate-400">
            /
          </kbd>
        </Link>

        {/* Pending Action Items Count */}
        <Link
          href="/action-plan"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-white text-xs font-semibold text-slate-800 hover:border-slate-300 transition-colors shadow-subtle"
        >
          <CheckSquare className="h-3.5 w-3.5 text-primary-600" />
          <span>My Tasks</span>
          {actionCount > 0 && (
            <span className="h-5 min-w-5 px-1.5 rounded-full bg-primary-100 text-primary-700 text-[10px] font-bold flex items-center justify-center">
              {actionCount}
            </span>
          )}
        </Link>

        {/* AI Shortcut Button */}
        <Link
          href="/assistant"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold shadow-sm transition-all shadow-blue-500/15"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Ask AI</span>
        </Link>
      </div>
    </header>
  );
};
