import { NoticeAnalysisResult } from '@/types';

export const mockNotices: NoticeAnalysisResult[] = [
  {
    id: 'not_master_intel_db',
    fileName: 'Notice2Action_Gujarat_Education_Intelligence_Database_Verified.pdf',
    fileSize: '2.8 MB',
    uploadedAt: '2026-10-03T09:30:00Z',
    title: 'Notice2Action: Gujarat Education Intelligence Master Database (2025–2028 Verified Snapshot)',
    authority: 'Education Department, Government of Gujarat & Statutory State Bodies',
    category: 'scholarship',
    status: 'OPEN',
    aiSummary:
      'Comprehensive official-source-first research snapshot and master policy database covering all Gujarat state scholarships (MYSY, MKKN, CMSS, Digital Gujarat, SHODH, ISEL), school welfare DBT programs (Namo Lakshmi, Namo Saraswati, Namo Kaushalya), centralized admissions (ACPC 50:50, ACPUGMEC, GCAS), and board/competitive exams (GSEB SSC 2027 confirmed dates, GUJCET, GPSC, GSSSB 7,338 vacancies).',
    importantDates: [
      {
        label: 'GSEB SSC 2027 Board Exams',
        date: '25 Feb – 17 Mar 2027',
        status: 'OFFICIALLY_CONFIRMED',
        badgeText: 'Officially Confirmed'
      },
      {
        label: 'GPSC Class 1 & 2 Main Exam',
        date: '05 Oct – 11 Oct 2026',
        status: 'OFFICIALLY_CONFIRMED',
        badgeText: 'Active Exam'
      },
      {
        label: 'SHODH Ph.D. Application Deadline',
        date: '19 Oct 2026 (18:00 IST)',
        status: 'OFFICIALLY_CONFIRMED',
        badgeText: 'Closing Soon'
      },
      {
        label: 'MYSY & Digital Gujarat Application Deadline',
        date: '31 Oct 2026 (18:00 IST)',
        status: 'OFFICIALLY_CONFIRMED',
        badgeText: 'Active Window'
      },
      {
        label: 'MYSY College Help Centre Verification',
        date: '15 Nov 2026',
        status: 'OFFICIALLY_CONFIRMED',
        badgeText: 'Mandatory Physical'
      },
      {
        label: 'GCAS UG Regular Final Phase',
        date: '30 Nov 2026',
        status: 'OFFICIALLY_CONFIRMED',
        badgeText: 'Portal Active'
      },
      {
        label: 'GUJCET 2027 Registration & Exam',
        date: 'Null / Unannounced (Expected Dec 2026 / Mar 2027)',
        status: 'NOT_ANNOUNCED',
        badgeText: 'Historical Watchlist'
      }
    ],
    actionItems: [
      {
        id: 'act_master_1',
        task: 'Submit MYSY higher education application on mysy.gujarat.gov.in before Oct 31, 2026 with Mamlatdar income certificate',
        required: true,
        suggestedDeadline: '31 Oct 2026'
      },
      {
        id: 'act_master_2',
        task: 'Submit Digital Gujarat post-matric SC/ST/SEBC/EWS forms with NPCI Aadhaar bank mapping before Oct 31, 2026',
        required: true,
        suggestedDeadline: '31 Oct 2026'
      },
      {
        id: 'act_master_3',
        task: 'Doctoral scholars: Apply for SHODH on shodh.gujgov.edu.in before 18:00 on Oct 19, 2026',
        required: true,
        suggestedDeadline: '19 Oct 2026'
      },
      {
        id: 'act_master_4',
        task: 'Secondary students: Verify enrollment in Namo Lakshmi (Classes 9–12 girls) & Namo Saraswati (Science) on namopayments.gujaratvsk.org',
        required: true,
        suggestedDeadline: '31 Oct 2026'
      },
      {
        id: 'act_master_5',
        task: 'Engineering aspirants: Note ACPC 50:50 composite merit formula (50% Class 12 Board Theory + 50% GUJCET)',
        required: true
      }
    ],
    warnings: [
      'Epistemic Grounding Rule: 2027 dates (GUJCET, ACPC, ACPUGMEC) are NOT ANNOUNCED; never rely on speculative aggregators.',
      'MYSY Medical Cap: MYSY caps MBBS tuition assistance at ₹2,00,000/yr. Eligible female students receive up to ₹4,00,000 additional under MKKN (total ₹6,00,000/yr).',
      'NAMO E-Tablet Scheme: Hardware distribution is suspended in state policy; replaced by direct DBT cash transfers (Namo Lakshmi & Namo Saraswati).',
      'Misinformation Alert: "Gujarat Laptop Sahay Yojana 2026" on sanman.gujarat.gov.in is unverified commercial misinformation.'
    ],
    sourceInfo: {
      authorityName: 'Government of Gujarat, KCG, GSHSEB, ACPC, GCAS, GPSC',
      officialPortalUrl: 'https://gujaratindia.gov.in',
      verificationLevel: 'OFFICIAL_PRIMARY',
      lastVerified: '2026-10-03',
      confidenceStatement: 'Verified master dataset audited across 25+ primary Gujarat departmental and statutory portals.'
    }
  },
  {
    id: 'not_mysy_2026',
    fileName: 'MYSY_Notification_2026_27.pdf',
    fileSize: '1.4 MB',
    uploadedAt: '2026-10-02T14:32:00Z',
    title: 'Education Department Circular: MYSY Higher Education Assistance & Extension',
    authority: 'Knowledge Consortium of Gujarat (KCG) / Education Department',
    category: 'scholarship',
    status: 'EXTENDED',
    aiSummary:
      'Official statutory guidelines and deadline schedule for Mukhyamantri Yuva Swavalamban Yojana (MYSY). Covers tuition assistance up to ₹50,000 for Engineering, ₹2,00,000 for Medical, ₹25,000 for Diploma, ₹10,000 for General Degrees, ₹12,000/yr hostel allowance, and ₹3k–₹10k equipment grants.',
    importantDates: [
      {
        label: 'Application Window Opened',
        date: '01 Aug 2026',
        status: 'OFFICIALLY_CONFIRMED',
        badgeText: 'Completed'
      },
      {
        label: 'Online Application Cutoff',
        date: '31 Oct 2026 (18:00 IST)',
        status: 'OFFICIALLY_CONFIRMED',
        badgeText: 'Active Deadline'
      },
      {
        label: 'College Help Centre Physical Verification',
        date: '15 Nov 2026',
        status: 'OFFICIALLY_CONFIRMED',
        badgeText: 'Mandatory Physical'
      }
    ],
    actionItems: [
      {
        id: 'act_1',
        task: 'Complete online application on mysy.gujarat.gov.in with bank details, marksheets, and college fee receipts',
        required: true,
        suggestedDeadline: '31 Oct 2026'
      },
      {
        id: 'act_2',
        task: 'Obtain Mamlatdar or TDO verified family income certificate (<= ₹6,00,000 annual limit)',
        required: true,
        suggestedDeadline: '20 Oct 2026'
      },
      {
        id: 'act_3',
        task: 'Present physical documents at designated College Help Centre before November 15, 2026',
        required: true,
        suggestedDeadline: '15 Nov 2026'
      }
    ],
    warnings: [
      'Minimum criteria: 80th percentile in Class 10/12 Board or 65% in Diploma (D2D entry).',
      'Aadhaar number must be seeded with the bank account via NPCI mapper for Direct Benefit Transfer.',
      'Double dipping with other state tuition assistance schemes is strictly prohibited.'
    ],
    sourceInfo: {
      authorityName: 'Education Department, Government of Gujarat',
      officialPortalUrl: 'https://mysy.gujarat.gov.in/',
      verificationLevel: 'OFFICIAL_PRIMARY',
      lastVerified: '2026-10-03',
      confidenceStatement: 'Official primary circular verified against Knowledge Consortium of Gujarat noticeboard.'
    }
  },
  {
    id: 'not_shodh_2026_27',
    fileName: 'SHODH_Advt_2026_27.pdf',
    fileSize: '950 KB',
    uploadedAt: '2026-10-01T11:00:00Z',
    title: 'KCG Official Notification: SHODH Doctoral Research Fellowship (2026–27)',
    authority: 'Knowledge Consortium of Gujarat (KCG) / Education Department',
    category: 'scholarship',
    status: 'OPEN',
    aiSummary:
      'Official advertisement for the Scheme of Developing High Quality Research (SHODH). Provides ₹20,000/month stipend for 2 years plus ₹20,000/year contingency (total ₹4,40,000 assistance) for full-time regular Ph.D. scholars in recognized Gujarat universities.',
    importantDates: [
      {
        label: 'Online Applications Opened',
        date: '01 Sep 2026',
        status: 'OFFICIALLY_CONFIRMED'
      },
      {
        label: 'Online Application Final Deadline',
        date: '19 Oct 2026 (18:00 IST)',
        status: 'OFFICIALLY_CONFIRMED'
      }
    ],
    actionItems: [
      {
        id: 'act_shodh_1',
        task: 'Apply online on shodh.gujgov.edu.in with Ph.D. admission letter and PET / NET scorecard',
        required: true,
        suggestedDeadline: '19 Oct 2026'
      },
      {
        id: 'act_shodh_2',
        task: 'Submit institutional verification form endorsed by University Nodal Officer',
        required: true,
        suggestedDeadline: '25 Oct 2026'
      }
    ],
    warnings: [
      'Scholars already receiving UGC-JRF, CSIR, ICSSR, or any other fellowship/salary are strictly ineligible.',
      'Must have scored minimum 55% in Master degree (50% for SC/ST/OBC-NCL/PwD).'
    ],
    sourceInfo: {
      authorityName: 'Knowledge Consortium of Gujarat',
      officialPortalUrl: 'https://shodh.gujgov.edu.in/',
      verificationLevel: 'OFFICIAL_PRIMARY',
      lastVerified: '2026-10-03',
      confidenceStatement: 'Official primary advertisement published on shodh.gujgov.edu.in.'
    }
  },
  {
    id: 'not_gtu_winter_2025',
    fileName: 'GTU_Exam_Circular_Winter2026.pdf',
    fileSize: '820 KB',
    uploadedAt: '2026-09-28T10:15:00Z',
    title: 'GTU Circular: Winter 2026 Remedial & Regular Semester Schedule',
    authority: 'Gujarat Technological University (GTU) Examination Division',
    category: 'exam',
    status: 'OPEN',
    aiSummary:
      'Specifies exam form filling timelines, hall ticket generation schedules, and subject-wise examination windows for GTU B.Tech/Diploma winter semester theory examinations.',
    importantDates: [
      {
        label: 'Exam Form Filling Start',
        date: '10 Oct 2026',
        status: 'OFFICIALLY_CONFIRMED'
      },
      {
        label: 'Regular Exam Fee Deadline',
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
        task: 'Check student portal for term-work clearance and fee payment status',
        required: true,
        suggestedDeadline: '15 Oct 2026'
      },
      {
        id: 'act_gtu_2',
        task: 'Download official hall ticket from timetable.gtu.ac.in',
        required: true,
        suggestedDeadline: '18 Nov 2026'
      }
    ],
    warnings: [
      'Late fee penalty applies after October 25, 2026.',
      'Only official timetables released on timetable.gtu.ac.in are authoritative.'
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
    title: 'ACPC Resolution: Engineering State Quota 50:50 Merit Weightage Clarification',
    authority: 'Admission Committee for Professional Courses (ACPC)',
    category: 'admission',
    status: 'COMPLETED',
    aiSummary:
      'Reconciliation and statutory confirmation of the official 50:50 composite merit formula (50% Class 12 Board theory percentile + 50% GUJCET percentile) for all state engineering seats.',
    importantDates: [
      {
        label: 'Statutory Resolution Gazetted',
        date: '15 Mar 2026',
        status: 'OFFICIALLY_CONFIRMED'
      }
    ],
    actionItems: [
      {
        id: 'act_acpc_1',
        task: 'Calculate composite merit score using: 0.50*(Board Theory Percentile) + 0.50*(GUJCET Percentile)',
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
