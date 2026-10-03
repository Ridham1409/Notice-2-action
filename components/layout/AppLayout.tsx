'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileHeader, MobileBottomNav } from './MobileNav';
import { Modal } from '../ui/Modal';
import { mockConflicts } from '@/mock/conflicts';
import { StatusBadge } from '../opportunities/StatusBadge';
import { ShieldCheck, AlertCircle, ExternalLink } from 'lucide-react';

export interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const [isConflictsOpen, setIsConflictsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col lg:flex-row font-sans antialiased">
      {/* Mobile Top Header */}
      <MobileHeader />

      {/* Desktop Persistent Sidebar */}
      <Sidebar onOpenConflicts={() => setIsConflictsOpen(true)} />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        <Header
          title={title}
          subtitle={subtitle}
          onOpenConflicts={() => setIsConflictsOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Source Conflicts & Discrepancies Resolution Modal */}
      <Modal
        isOpen={isConflictsOpen}
        onClose={() => setIsConflictsOpen(false)}
        title="Fact Discrepancies & Epistemic Audit"
        subtitle="Notice2Action reconciles conflicting web aggregator claims against primary government gazettes."
        maxWidth="2xl"
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <span className="font-semibold block text-amber-950 mb-0.5">
              Evidentiary Precedence Protocol
            </span>
            Third-party aggregators frequently publish outdated dates or formulas. Notice2Action
            resolves all facts using gazetted department orders, government resolutions, and live portal states.
          </div>

          <div className="space-y-3">
            {mockConflicts.map((conf) => (
              <div
                key={conf.id}
                className="p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-subtle"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{conf.topic}</h4>
                  <StatusBadge status={conf.status} size="sm" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {conf.sources.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1"
                    >
                      <span className="text-[10px] font-bold uppercase text-slate-400 block truncate">
                        Source: {s.source}
                      </span>
                      <p className="font-medium text-slate-800">{s.claim}</p>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Verified Primary Resolution:</span>
                    <span className="underline decoration-emerald-400">{conf.resolved_value}</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 leading-relaxed pl-5">
                    {conf.reason}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};
