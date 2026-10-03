export type OpportunityType = 'scholarship' | 'exam' | 'admission' | 'scheme';

export type OpportunityStatus =
  | 'OPEN'
  | 'UPCOMING'
  | 'CLOSED'
  | 'COMPLETED'
  | 'EXTENDED'
  | 'NOT_ANNOUNCED'
  | 'CONFLICTING'
  | 'NEEDS_VERIFICATION';

export type DateVerificationStatus =
  | 'OFFICIALLY_CONFIRMED'
  | 'OFFICIALLY_EXTENDED'
  | 'SECONDARY_SOURCE_VERIFIED'
  | 'HISTORICAL_PATTERN'
  | 'NOT_ANNOUNCED'
  | 'CONFLICTING'
  | 'UNVERIFIED';

export type ExtensionStatus =
  | 'CONFIRMED_EXTENSION'
  | 'NO_EXTENSION_FOUND_ON_OFFICIAL_PAGE'
  | 'NO_EXTENSION_ANNOUNCED'
  | 'HISTORICAL_EXTENSION_PATTERN'
  | 'UNKNOWN';

export type SourceLevel =
  | 'OFFICIAL_PRIMARY'
  | 'OFFICIAL_SECONDARY'
  | 'REPUTABLE_SECONDARY'
  | 'HISTORICAL'
  | 'UNVERIFIED';

export interface SourceReference {
  label: string;
  url: string;
  source_level: SourceLevel;
  department?: string;
  notes?: string;
}

export interface EligibilityCriteria {
  academic?: string;
  income?: string;
  category?: string;
  domicile?: string;
  exclusions?: string;
  documents_note?: string;
}

export interface BenefitDetails {
  tuition?: string | null;
  hostel?: string | null;
  books_equipment?: string | null;
  amount?: string | null;
  stipend?: string | null;
  contingency?: string | null;
  device?: string | null;
  total_assistance?: string | null;
  purpose?: string | null;
  details?: string;
}

export interface DeadlineSchedule {
  academic_year?: string;
  opening_date?: string | null;
  original_deadline?: string | null;
  extended_deadline?: string | null;
  final_deadline?: string | null;
  verification_deadline?: string | null;
  date_status: DateVerificationStatus;
  days_remaining?: number | null;
  registration_open?: string | null;
  registration_close?: string | null;
  exam_date?: string | null;
  admit_card_date?: string | null;
  result_date?: string | null;
  rounds_info?: string | null;
}

export interface Opportunity {
  id: string;
  title: string;
  subtitle?: string;
  type: OpportunityType;
  authority: string;
  department?: string;
  scope: string;
  status: OpportunityStatus;
  urgencyLevel?: 'high' | 'medium' | 'low';
  
  // Deadlines & Timeline
  schedule: DeadlineSchedule;
  extension_status: ExtensionStatus;
  historical_extension_pattern?: string;
  
  // Eligibility & Benefits
  target_students: string[];
  education_levels: string[];
  eligibility: EligibilityCriteria;
  benefits: BenefitDetails;
  
  // Documents & Steps
  required_documents: string[];
  application_steps?: string[];
  
  // Verification & Trust
  sources: SourceReference[];
  official_source_found: boolean;
  official_source_url: string;
  source_level: SourceLevel;
  last_verified: string;
  verification_notes?: string;
  official_notification_pdf?: string | null;

  // Student Match Scoring (Mock intelligence)
  matchReason?: string;
  matchScore?: number; // 0 - 100
}

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gujaratDomicile: boolean;
  academicLevel: 'Class 10' | 'Class 11' | 'Class 12' | 'Diploma' | 'UG' | 'PG' | 'PhD';
  courseStream: string;
  boardUniversity: string;
  currentSemester?: string;
  percentageOrCgpa: string;
  category: 'General' | 'SC' | 'ST' | 'SEBC' | 'EWS' | 'Other';
  annualFamilyIncome: number; // in INR
  district: string;
  taluka: string;
  hosteller: boolean;
  disability: boolean;
  specialCircumstances?: string;
}

export interface ActionPlanItem {
  id: string;
  title: string;
  opportunityId?: string;
  opportunityTitle?: string;
  type: 'scholarship' | 'exam' | 'admission' | 'scheme' | 'document' | 'general';
  deadline?: string;
  timeRemainingText?: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  categoryTimeframe: 'TODAY' | 'UPCOMING' | 'COMPLETED';
  documents: {
    name: string;
    checked: boolean;
  }[];
  notes?: string;
  officialUrl?: string;
  createdAt: string;
  completedAt?: string;
}

export interface NoticeAnalysisResult {
  id: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  title: string;
  authority: string;
  category: OpportunityType;
  status: OpportunityStatus;
  
  aiSummary: string;
  
  importantDates: {
    label: string;
    date: string;
    status: DateVerificationStatus;
    badgeText?: string;
  }[];
  
  actionItems: {
    id: string;
    task: string;
    required: boolean;
    suggestedDeadline?: string;
  }[];
  
  requiredDocuments?: string[];
  eligibilityConditions?: string[];
  
  warnings: string[];
  
  sourceInfo: {
    authorityName: string;
    officialPortalUrl: string;
    verificationLevel: SourceLevel;
    lastVerified: string;
    confidenceStatement: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  
  // Structured cards returned by AI Agent
  structuredData?: {
    type: 'opportunities_list' | 'notice_summary' | 'action_plan_preview' | 'general';
    opportunities?: Opportunity[];
    matchedCount?: number;
    disclaimer?: string;
    sources?: SourceReference[];
    lastVerified?: string;
  };
}

export interface SourceConflict {
  id: string;
  topic: string;
  sources: {
    claim: string;
    source: string;
  }[];
  resolved_value: string;
  reason: string;
  status: DateVerificationStatus;
  last_verified: string;
}
