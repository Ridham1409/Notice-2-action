'use client';

import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ChatWindow } from '@/components/ai/ChatWindow';

export default function AssistantPage() {
  return (
    <AppLayout
      title="Notice2Action AI"
      subtitle="Ask about scholarships, exams, admissions, or any Gujarat education notice."
    >
      <div className="h-full">
        <ChatWindow />
      </div>
    </AppLayout>
  );
}
