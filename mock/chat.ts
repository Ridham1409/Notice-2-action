import { ChatMessage } from '@/types';
import { mockOpportunities } from './opportunities';

export const quickPrompts = [
  'Mara mate atyare kai scholarship relevant che?',
  'MYSY ni deadline su che?',
  'GUJCET 2027 kyare che?',
  'What documents do I need for MYSY?',
  'Digital Gujarat post-matric eligibility su che?',
  'Find scholarships I qualify for',
];

export const thinkingSteps = [
  'Reading your student profile and Gujarat domicile records...',
  'Querying official state portals (KCG, Digital Gujarat, GSEB)...',
  'Filtering active academic cycles and deadline statuses...',
  'Verifying official resolutions against third-party rumors...',
  'Synthesizing actionable steps and document checklists...'
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg_1',
    sender: 'user',
    timestamp: '10:42 AM',
    content: 'I am a Gujarat student doing B.Tech in Computer Engineering. My family income is ₹3.5 lakh. What scholarships should I check?'
  },
  {
    id: 'msg_2',
    sender: 'assistant',
    timestamp: '10:43 AM',
    content:
      'Based on your profile (Gujarat domicile, B.Tech degree, family income ₹3.5 Lakh, and >80th percentile), here are the verified Gujarat schemes you should take immediate action on:',
    structuredData: {
      type: 'opportunities_list',
      matchedCount: 2,
      opportunities: [
        mockOpportunities[0], // MYSY
        mockOpportunities[1], // Digital Gujarat
      ],
      disclaimer: 'Always apply before the official portal cutoff. Extensions require gazetted government approval.',
      sources: [
        {
          label: 'Official MYSY Portal',
          url: 'https://mysy.gujarat.gov.in/',
          source_level: 'OFFICIAL_PRIMARY'
        },
        {
          label: 'Digital Gujarat Post-Matric Portal',
          url: 'https://www.digitalgujarat.gov.in/LoginApp',
          source_level: 'OFFICIAL_PRIMARY'
        }
      ],
      lastVerified: 'Oct 3, 2026'
    }
  }
];

export const presetAIResponses: Record<string, { answer: string; opportunities?: string[]; sources?: any[] }> = {
  'scholarships': {
    answer: 'Here are the primary scholarship schemes currently open or active for Gujarat students based on verified government records:',
    opportunities: ['SCH-MYSY-2026', 'SCH-DIGITAL-POSTMATRIC-2026', 'SCH-ISEL-2026']
  },
  'deadlines': {
    answer: 'Here are the urgent education deadlines requiring immediate student attention across Gujarat:',
    opportunities: ['SCH-MYSY-2026', 'SCH-DIGITAL-POSTMATRIC-2026', 'SCH-SHODH-2026', 'EX-GPSC-CLASS-1-2-2026']
  },
  'exams': {
    answer: 'Here is the verified status of upcoming state examinations and entrance tests:',
    opportunities: ['EX-GUJCET-2027', 'EX-GSEB-SSC-2027', 'EX-GPSC-CLASS-1-2-2026']
  },
  'admissions': {
    answer: 'Here are the centralized state admission portals and current cycle milestones:',
    opportunities: ['ADM-ACPC-BE-2026-27']
  }
};
