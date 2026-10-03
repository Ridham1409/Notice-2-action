import { NoticeAnalysisResult } from '@/types';

export const mockNotices: NoticeAnalysisResult[] = [
  {
    id: 'not_mysy_2026',
    fileName: 'MYSY_Notification_2026.pdf',
    fileSize: '1.4 MB',
    uploadedAt: '2026-10-02T14:32:00Z',
    title: 'Education Department Circular: MYSY Academic Year 2026-27 Timeline Extension',
    authority: 'Knowledge Consortium of Gujarat (KCG) / Education Department',
    category: 'scholarship',
    status: 'EXTENDED',
    aiSummary:
      'This notice announces an official extension of the online application and institutional verification dates for the Mukhyamantri Yuva Swavalamban Yojana (MYSY) for academic year 2026-27. It modifies the initial cutoff date and mandates physical verification at designated Help Centres.',
    importantDates: [
      {
        label: 'Application Window Opened',
        date: '01 Sep 2026',
        status: 'OFFICIALLY_CONFIRMED',
        badgeText: 'Completed'
      },
      {
        label: 'Original Submission Cutoff',
        date: '23 Sep 2026',
        status: 'OFFICIALLY_CONFIRMED',
        badgeText: 'Superseded'
      },
      {
        label: 'Extended Application Deadline',
        date: '30 Oct 2026 (18:00 IST)',
        status: 'OFFICIALLY_EXTENDED',
        badgeText: 'Active Deadline'
      },
      {
        label: 'College Help Centre Verification Closes',
        date: '15 Nov 2026',
        status: 'OFFICIALLY_CONFIRMED',
        badgeText: 'Mandatory'
      }
    ],
    actionItems: [
      {
        id: 'act_1',
        task: 'Complete online application on mysy.gujarat.gov.in with bank details and marksheet',
        required: true,
        suggestedDeadline: '30 Oct 2026'
      },
      {
        id: 'act_2',
        task: 'Obtain Mamlatdar or TDO verified family income certificate for current fiscal year',
        required: true,
        suggestedDeadline: '20 Oct 2026'
      },
      {
        id: 'act_3',
        task: 'Present physical documents at designated College Help Centre before cutoff',
        required: true,
        suggestedDeadline: '15 Nov 2026'
      }
    ],
    warnings: [
      'Do not rely on informal social media claims of future extensions. Only gazetted government resolutions are legally recognized.',
      'Aadhaar number must be seeded with the bank account via NPCI mapper; standard bank accounts without active DBT seeding will fail disbursement.',
      'Students receiving benefits under any other state tuition fee waiver are strictly disqualified from MYSY.'
    ],
    sourceInfo: {
      authorityName: 'Education Department, Government of Gujarat',
      officialPortalUrl: 'https://mysy.gujarat.gov.in/',
      verificationLevel: 'OFFICIAL_PRIMARY',
      lastVerified: '2026-10-03',
      confidenceStatement: 'Official primary document verified against Knowledge Consortium of Gujarat noticeboard.'
    }
  },
  {
    id: 'not_gtu_winter_2025',
    fileName: 'GTU_Exam_Circular_Winter2025.pdf',
    fileSize: '820 KB',
    uploadedAt: '2026-09-28T10:15:00Z',
    title: 'GTU Circular: Winter 2025 Remedial & Regular Semester Schedule',
    authority: 'Gujarat Technological University (GTU) Examination Division',
    category: 'exam',
    status: 'OPEN',
    aiSummary:
      'This circular specifies exam form fill dates, hall ticket generation schedules, and tentative start dates for GTU B.Tech/Diploma winter semester theory examinations.',
    importantDates: [
      {
        label: 'Exam Form Filling Start',
        date: '10 Oct 2026',
        status: 'OFFICIALLY_CONFIRMED'
      },
      {
        label: 'Regular Fee Deadline',
        date: '25 Oct 2026',
        status: 'OFFICIALLY_CONFIRMED'
      },
      {
        label: 'Theory Examination Commencement',
        date: '24 Nov 2026',
        status: 'OFFICIALLY_CONFIRMED'
      }
    ],
    actionItems: [
      {
        id: 'act_gtu_1',
        task: 'Check student portal for term-work clearance and fee status',
        required: true,
        suggestedDeadline: '15 Oct 2026'
      },
      {
        id: 'act_gtu_2',
        task: 'Download and verify GTU winter examination hall ticket',
        required: true,
        suggestedDeadline: '18 Nov 2026'
      }
    ],
    warnings: [
      'Late fee penalty applies after October 25, 2026.',
      'Students with backlog/remedial subjects must select corresponding semester codes carefully.'
    ],
    sourceInfo: {
      authorityName: 'Gujarat Technological University',
      officialPortalUrl: 'https://old26.gtu.ac.in/exam.aspx',
      verificationLevel: 'OFFICIAL_PRIMARY',
      lastVerified: '2026-10-03',
      confidenceStatement: 'Verified from official GTU circular archive.'
    }
  },
  {
    id: 'not_acpc_formula_2026',
    fileName: 'ACPC_BE_Admission_Formula_Resolution.pdf',
    fileSize: '640 KB',
    uploadedAt: '2026-09-20T16:45:00Z',
    title: 'ACPC Resolution: Engineering State Quota Merit Weightage Clarification',
    authority: 'Admission Committee for Professional Courses (ACPC)',
    category: 'admission',
    status: 'COMPLETED',
    aiSummary:
      'Reconciliation of merit calculation methodology confirming the 50:50 percentile distribution between Class 12 Board theory examinations and GUJCET scores.',
    importantDates: [
      {
        label: 'Resolution Gazetted',
        date: '15 Mar 2026',
        status: 'OFFICIALLY_CONFIRMED'
      }
    ],
    actionItems: [
      {
        id: 'act_acpc_1',
        task: 'Calculate composite merit score using: 0.50*(Board Percentile) + 0.50*(GUJCET Percentile)',
        required: true
      }
    ],
    warnings: [
      'Confirms that older 60:40 formulas cited by third-party aggregators are obsolete and must not be used.'
    ],
    sourceInfo: {
      authorityName: 'ACPC Gujarat',
      officialPortalUrl: 'https://acpc.gujarat.gov.in/',
      verificationLevel: 'OFFICIAL_PRIMARY',
      lastVerified: '2026-10-03',
      confidenceStatement: 'Statutory regulation under Gujarat Technical Educational Institutions Act.'
    }
  }
];
