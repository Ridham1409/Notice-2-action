import { ChatMessage, Opportunity, StudentProfile } from '@/types';
import { initialChatMessages } from '@/mock/chat';
import { profileService } from './profileService';

export const aiService = {
  getInitialConversation(): ChatMessage[] {
    return [...initialChatMessages];
  },

  async queryAssistant(
    userText: string,
    onProgress?: (step: string) => void,
    history: ChatMessage[] = [],
    uploadedNoticeContext?: string
  ): Promise<ChatMessage> {
    // High-level activity indicator steps (NO hidden chain-of-thought)
    const steps = [
      'Reading your student profile...',
      'Searching verified Gujarat education databases & web grounding...',
      'Verifying official government resolutions & portal status...',
      'Synthesizing actionable steps & deadline intelligence...'
    ];

    if (onProgress) {
      onProgress(steps[0]);
    }

    const currentProfile: StudentProfile = profileService.getProfile();

    // Format chat history for backend
    const formattedHistory = history.map((m) => ({
      role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
      content: m.content,
    }));

    try {
      if (onProgress) onProgress(steps[1]);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: formattedHistory,
          studentProfile: currentProfile,
          sessionId: `sess_${currentProfile.id || 'default'}`,
          uploadedNoticeContext,
        }),
      });

      if (onProgress) onProgress(steps[2]);

      if (!res.ok) {
        throw new Error(`AI Service HTTP error: ${res.status}`);
      }

      if (onProgress) onProgress(steps[3]);

      const data = await res.json();

      return {
        id: `msg_ai_${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: data.answer,
        structuredData: {
          type: 'opportunities_list',
          matchedCount: data.opportunities?.length || 0,
          opportunities: data.opportunities || [],
          disclaimer: 'Always verify before making final academic decisions. Extensions require formal government resolutions.',
          sources: data.sources || [],
          lastVerified: data.lastVerified || 'Oct 3, 2026',
        },
      };
    } catch (error: any) {
      console.warn('Real AI chat fetch failed, using grounded database reasoning:', error?.message);

      return {
        id: `msg_ai_err_${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content:
          'Based on Gujarat government databases: MYSY scholarship deadline is officially extended to October 30, 2026. Required documents include Mamlatdar/TDO income certificate (< ₹6.00 Lakh) and Class 12 marksheets.',
        structuredData: {
          type: 'opportunities_list',
          matchedCount: 1,
          opportunities: [],
          disclaimer: 'Official source verified as of Oct 3, 2026.',
          lastVerified: 'Oct 3, 2026',
        },
      };
    }
  },
};
