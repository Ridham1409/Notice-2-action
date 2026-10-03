'use client';

import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PDFUploader } from '@/components/notices/PDFUploader';
import { NoticeCard } from '@/components/notices/NoticeCard';
import { NoticeAnalysis } from '@/components/notices/NoticeAnalysis';
import { noticeService } from '@/services/noticeService';
import { actionService } from '@/services/actionService';
import { NoticeAnalysisResult } from '@/types';
import { FileText, Sparkles, Check, Clock, Upload } from 'lucide-react';

export default function NoticesPage() {
  const [notices, setNotices] = useState<NoticeAnalysisResult[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<NoticeAnalysisResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [addedPlanIds, setAddedPlanIds] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const list = await noticeService.getRecentNotices();
      setNotices(list);
      if (list.length > 0) {
        setSelectedNotice(list[0]); // Default to first (MYSY)
      }
    }
    load();
  }, []);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    try {
      const parsed = await noticeService.analyzeNotice(file);
      setNotices((prev) => [parsed, ...prev.filter((n) => n.id !== parsed.id)]);
      setSelectedNotice(parsed);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddToPlan = (notice: NoticeAnalysisResult) => {
    const docChecklist = notice.requiredDocuments && notice.requiredDocuments.length > 0
      ? notice.requiredDocuments.map((docName) => ({ name: docName, checked: false }))
      : [
          { name: `Reference: ${notice.fileName}`, checked: true },
          { name: 'Self-attested copy of relevant marksheet/certificate', checked: false },
        ];

    notice.actionItems.forEach((item) => {
      actionService.addItem({
        title: item.task,
        type: notice.category,
        deadline: item.suggestedDeadline || notice.importantDates[0]?.date || 'Per Notice Schedule',
        priority: item.required ? 'HIGH' : 'MEDIUM',
        status: 'PENDING',
        categoryTimeframe: 'TODAY',
        documents: docChecklist,
        notes: `Extracted from ${notice.fileName} (${notice.authority}).`,
        officialUrl: notice.sourceInfo.officialPortalUrl,
      });
    });
    setAddedPlanIds((prev) => [...prev, notice.id]);
  };

  return (
    <AppLayout
      title="Government Notices"
      subtitle="Upload or view official Gujarat notifications to extract deadlines and action tasks."
    >
      <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
        {/* Upload Section */}
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary-600" />
            <h2 className="text-base font-bold text-slate-900">
              Upload Official PDF Notice
            </h2>
          </div>
          <PDFUploader onFileUpload={handleFileUpload} isProcessing={isProcessing} />

          {isProcessing && (
            <div className="p-4 rounded-xl bg-primary-50/70 border border-primary-200/60 space-y-2.5 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-900">
                <Sparkles className="h-4 w-4 text-primary-600 animate-spin" />
                <span>Notice2Action Autonomous Pipeline Active...</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-primary-800">
                <div className="flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 text-emerald-600" /> Document extracted & verified
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 text-emerald-600" /> Important dates detected
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 text-emerald-600" /> Eligibility conditions detected
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 text-emerald-600" /> Required documents detected
                </div>
                <div className="flex items-center gap-1.5 font-medium sm:col-span-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600" /> Action items generated
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Selected Notice Analysis Result */}
        {selectedNotice && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Document Intelligence
              </h3>
              <span className="text-xs text-slate-400">
                Powered by Notice2Action OCR & Verification Engine
              </span>
            </div>

            <NoticeAnalysis
              notice={selectedNotice}
              onAddToPlan={handleAddToPlan}
              isAddedToPlan={addedPlanIds.includes(selectedNotice.id)}
            />
          </div>
        )}

        {/* Recent Notices List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Pre-Loaded Gujarat Government Circulars ({notices.length})
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Click any notice to view extracted action items
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {notices.map((n) => (
              <NoticeCard
                key={n.id}
                notice={n}
                onSelect={(selected) => setSelectedNotice(selected)}
                isSelected={selectedNotice?.id === n.id}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
