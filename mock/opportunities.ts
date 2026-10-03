import { Opportunity } from '@/types';

export const mockOpportunities: Opportunity[] = [
  {
    id: 'SCH-MYSY-2026',
    title: 'Mukhyamantri Yuva Swavalamban Yojana (MYSY)',
    subtitle: 'Higher Education Tuition, Hostel & Equipment Assistance',
    type: 'scholarship',
    authority: 'Education Department, Government of Gujarat',
    department: 'Knowledge Consortium of Gujarat (KCG)',
    scope: 'Gujarat',
    status: 'EXTENDED',
    urgencyLevel: 'high',
    schedule: {
      academic_year: '2026-27',
      opening_date: '2026-08-01',
      original_deadline: '2026-09-23',
      extended_deadline: '2026-10-30',
      final_deadline: '2026-10-30',
      verification_deadline: '2026-11-15',
      date_status: 'OFFICIALLY_EXTENDED',
      days_remaining: 27,
    },
    extension_status: 'CONFIRMED_EXTENSION',
    historical_extension_pattern:
      'Application portals historically open in August and extend past the initial September deadline. Government resolution confirmed extension until October 30, 2026.',
    target_students: [
      'Meritorious Gujarat students pursuing Diploma, Degree Engineering, Pharmacy, Medical & General Higher Education'
    ],
    education_levels: ['Diploma', 'UG', 'Professional Courses'],
    eligibility: {
      academic:
        '80th percentile or higher in Class 10 (for Diploma) or Class 12 (for Degree); minimum 65% aggregate for Diploma-to-Degree (D2D) lateral entry.',
      income: 'Annual family income must not exceed ₹6,00,000 from all sources, certified by Mamlatdar or TDO.',
      domicile: 'Permanent resident of Gujarat who completed schooling in the state.',
      exclusions: 'Students receiving other state government tuition scholarships are prohibited from double-dipping.',
      documents_note: 'Income certificate must be verified by Mamlatdar/TDO. Valid hostel warden certificate required for hostel grant.'
    },
    benefits: {
      tuition:
        '50% of tuition fee up to ₹50,000/yr for Degree Engineering & Pharmacy; up to ₹2,00,000/yr for MBBS/BDS; up to ₹25,000/yr for Diploma; up to ₹10,000/yr for General Degrees.',
      hostel:
        '₹1,200/month for 10 months (₹12,000/yr) for students enrolled outside native taluka residing in non-government hostels.',
      books_equipment:
        '₹5,000 one-time grant for Degree Engineering and Pharmacy students (₹10,000 for Medical, ₹3,000 for Diploma).',
      amount: 'Up to ₹67,000/year for Engineering students (Tuition + Hostel + Equipment)',
      total_assistance: 'Up to ₹67,000/yr (Degree Engg)'
    },
    required_documents: [
      'Class 10 / 12 Original Marksheet',
      'ACPC / Admission Allotment Letter',
      'College Tuition Fee Receipt',
      'Income Certificate (Issued by Mamlatdar or TDO)',
      'Domicile / Gujarat Residence Certificate',
      'Aadhaar Card (UIDAI Linked)',
      'Aadhaar-seeded Bank Account Passbook / Cancelled Cheque',
      'Hostel Warden Certificate & Living Fee Receipt (if hosteller)',
      'College Bonafide Certificate'
    ],
    application_steps: [
      'Step 1: Register on the MYSY official portal using Board Exam Roll Number and Passing Year',
      'Step 2: Fill personal, family income and bank account details (verify NPCI Aadhaar seeding)',
      'Step 3: Upload scanned PDFs of marksheets, fee receipts, and Mamlatdar income certificate',
      'Step 4: Lock and submit application form, print acknowledgment slip',
      'Step 5: Visit the designated College Help Centre before November 15, 2026 for physical verification'
    ],
    sources: [
      {
        label: 'Official MYSY Portal',
        url: 'https://mysy.gujarat.gov.in/',
        source_level: 'OFFICIAL_PRIMARY'
      },
      {
        label: 'Education Department GR / Guidelines',
        url: 'https://mysy.guj.nic.in/Notice/MYSY_Guidelines.pdf',
        source_level: 'OFFICIAL_PRIMARY'
      }
    ],
    official_source_found: true,
    official_source_url: 'https://mysy.gujarat.gov.in/',
    source_level: 'OFFICIAL_PRIMARY',
    last_verified: '2026-10-03',
    verification_notes:
      'Active official window confirmed via official government circular. Final date is 2026-10-30; Help Centre verification closes 2026-11-15.',
    official_notification_pdf: 'https://mysy.gujarat.gov.in/Noticeboard/MYSY_FAQ_25_26.pdf',
    matchReason:
      'Matches your profile: Gujarat resident, B.Tech student, 84.5% (>80th percentile), family income ₹3.5L (< ₹6.0L ceiling), and hosteller in non-govt accommodation.',
    matchScore: 98
  },
  {
    id: 'SCH-DIGITAL-POSTMATRIC-2026',
    title: 'Digital Gujarat Post-Matric Scholarships (SC / SEBC / ST / EWS)',
    subtitle: 'State Departmental Tuition & Maintenance Grants',
    type: 'scholarship',
    authority: 'Government of Gujarat',
    department: 'Department of Social Justice and Empowerment / Tribal Development',
    scope: 'Gujarat',
    status: 'OPEN',
    urgencyLevel: 'high',
    schedule: {
      academic_year: '2026-27',
      opening_date: '2026-08-01',
      original_deadline: '2026-10-31',
      extended_deadline: null,
      final_deadline: '2026-10-31',
      verification_deadline: '2026-11-30',
      date_status: 'OFFICIALLY_CONFIRMED',
      days_remaining: 28,
    },
    extension_status: 'NO_EXTENSION_FOUND_ON_OFFICIAL_PAGE',
    historical_extension_pattern:
      'Department historically reopens supplementary windows in Feb-March and May-June to clear backlogs. However, students must submit prior to October 31 cutoff.',
    target_students: [
      'SC, SEBC/OBC, ST, and EWS students enrolled in post-matric and higher education courses'
    ],
    education_levels: ['Class 11', 'Class 12', 'Diploma', 'UG', 'PG', 'Doctoral'],
    eligibility: {
      academic: 'Admitted into recognized post-matric professional or non-professional degree/diploma program.',
      income: 'Family annual income <= ₹2,50,000 for SC/ST (GoI norms) and SEBC (State norms); ₹2,00,000 for NTDNT.',
      category: 'SC, ST, SEBC, or EWS category certificate issued by competent Gujarat authority.',
      domicile: 'Permanent resident of Gujarat state.',
      exclusions: 'Cannot claim double-benefit for identical tuition heads with MYSY.'
    },
    benefits: {
      tuition: '100% compulsory non-refundable fees covered or exempted upfront via Freeship Card for SC/ST students.',
      hostel: 'Integrated maintenance allowance up to ₹13,500/year depending on course group and hosteller status.',
      books_equipment: 'Special equipment assistance (BCK-80/VKY-164) for first-year technical students.',
      amount: 'Full tuition reimbursement + ₹13,500 maintenance allowance'
    },
    required_documents: [
      'Caste Certificate / Non-Creamy Layer (SEBC)',
      'Income Certificate (Mamlatdar / TDO)',
      'Previous Year Marksheet',
      'Current Year Fee Receipt / Freeship Card',
      'Aadhaar Card & Bank Passbook',
      'Hostel Warden Certificate (for hosteller rates)'
    ],
    sources: [
      {
        label: 'Digital Gujarat Citizen Portal',
        url: 'https://www.digitalgujarat.gov.in/LoginApp',
        source_level: 'OFFICIAL_PRIMARY'
      }
    ],
    official_source_found: true,
    official_source_url: 'https://www.digitalgujarat.gov.in/LoginApp',
    source_level: 'OFFICIAL_PRIMARY',
    last_verified: '2026-10-03',
    verification_notes:
      'Current fresh and renewal window for AY 2026-27 closes on October 31, 2026.',
    matchReason:
      'Verify category eligibility: For General category students, MYSY is the primary vehicle; if SEBC/EWS certificate is held and income is under ₹2.5L, this portal provides full fee waiver.',
    matchScore: 78
  },
  {
    id: 'SCH-SHODH-2026',
    title: 'SHODH — Scheme of Developing High Quality Research',
    subtitle: 'State Fellowship for Full-Time Doctoral Scholars',
    type: 'scholarship',
    authority: 'Education Department, Government of Gujarat',
    department: 'Knowledge Consortium of Gujarat (KCG)',
    scope: 'Gujarat',
    status: 'OPEN',
    urgencyLevel: 'high',
    schedule: {
      academic_year: '2026-27',
      opening_date: '2026-09-01',
      original_deadline: '2026-10-19',
      extended_deadline: null,
      final_deadline: '2026-10-19',
      verification_deadline: null,
      date_status: 'OFFICIALLY_CONFIRMED',
      days_remaining: 16,
    },
    extension_status: 'NO_EXTENSION_FOUND_ON_OFFICIAL_PAGE',
    target_students: [
      'Full-time Ph.D. scholars in recognized Gujarat universities and state research institutions'
    ],
    education_levels: ['PhD'],
    eligibility: {
      academic: 'Secured confirmed full-time Ph.D. admission; cleared university PET or UGC-NET/CSIR-NET/GATE.',
      income: 'No direct family income cap, but candidate must not be working or drawing salary/remuneration.',
      domicile: 'Permanent resident of Gujarat or Master’s degree from a recognized university in Gujarat.',
      exclusions: 'Scholars receiving UGC JRF, CSIR, ICAR, ICSSR or other fellowships are ineligible.'
    },
    benefits: {
      stipend: '₹15,000 per month for 24 months (total ₹3,60,000 stipend)',
      contingency: '₹20,000 per year for research consumables and field books (total ₹40,000)',
      amount: '₹4,00,000 total research fellowship over 2 years'
    },
    required_documents: [
      'Confirmed Ph.D. Admission Order',
      'PET / UGC-NET / GATE Scorecard',
      'Master’s Degree Marksheets & Degree Certificate',
      'Research Guide & University Registrar Endorsement',
      'Aadhaar Card and Bank Account Verification'
    ],
    sources: [
      {
        label: 'SHODH Portal',
        url: 'https://shodh.gujarat.gov.in/',
        source_level: 'OFFICIAL_PRIMARY'
      }
    ],
    official_source_found: true,
    official_source_url: 'https://shodh.gujarat.gov.in/',
    source_level: 'OFFICIAL_PRIMARY',
    last_verified: '2026-10-03',
    verification_notes:
      'Official notification confirms deadline of October 19, 2026 at 18:00 IST.',
    matchReason: 'Intended for doctoral researchers. Relevant if planning research or postgraduate advancement.',
    matchScore: 40
  },
  {
    id: 'SCH-ISEL-2026',
    title: 'Interest Subsidy Scheme on Education Loan (ISEL)',
    subtitle: '100% Moratorium Interest Waiver for Bank Loans',
    type: 'scheme',
    authority: 'Education Department, Government of Gujarat',
    department: 'Knowledge Consortium of Gujarat (KCG)',
    scope: 'Gujarat',
    status: 'OPEN',
    urgencyLevel: 'medium',
    schedule: {
      academic_year: '2026-27',
      opening_date: '2026-07-01',
      original_deadline: 'Rolling / Ongoing',
      final_deadline: 'Rolling / Ongoing',
      date_status: 'OFFICIALLY_CONFIRMED',
      days_remaining: null,
    },
    extension_status: 'NO_EXTENSION_ANNOUNCED',
    historical_extension_pattern: 'Processed continuously on rolling basis by KCG.',
    target_students: [
      'Students availing higher education loans from Scheduled Commercial Banks for studies in India or abroad'
    ],
    education_levels: ['Diploma', 'UG', 'PG', 'PhD'],
    eligibility: {
      academic: 'Minimum 60th percentile in Class 12 or equivalent qualifying examination.',
      income: 'Family annual income <= ₹6,00,000.',
      domicile: 'Passed Class 12 from a recognized school in Gujarat.',
      exclusions: 'Cannot combine with state tuition fee waiver for same period.'
    },
    benefits: {
      amount: '100% interest subsidy on bank loan amount up to ₹10,00,000 during course + 1 year moratorium.',
      details: 'Reimburses interest paid to the commercial bank directly, avoiding interest accumulation before job start.'
    },
    required_documents: [
      'Bank Loan Sanction Letter with Moratorium terms',
      'Class 12 Marksheet (>= 60 percentile)',
      'Mamlatdar / TDO Income Certificate',
      'Admission Letter',
      'Bank Repayment / Disbursal Statement'
    ],
    sources: [
      {
        label: 'KCG ISEL Official Portal',
        url: 'https://kcg.gujgov.edu.in/kcg/initiative/interest-subsidy',
        source_level: 'OFFICIAL_PRIMARY'
      }
    ],
    official_source_found: true,
    official_source_url: 'https://kcg.gujgov.edu.in/kcg/initiative/interest-subsidy',
    source_level: 'OFFICIAL_PRIMARY',
    last_verified: '2026-10-03',
    matchReason: 'Ideal backup if you have taken or plan an education loan up to ₹10L for college expenses.',
    matchScore: 85
  },
  {
    id: 'EX-GUJCET-2027',
    title: 'Gujarat Common Entrance Test (GUJCET 2027)',
    subtitle: 'State Entrance Exam for Engineering & Pharmacy',
    type: 'exam',
    authority: 'GSHSEB Gandhinagar',
    scope: 'Gujarat',
    status: 'NOT_ANNOUNCED',
    urgencyLevel: 'medium',
    schedule: {
      academic_year: '2027-28',
      opening_date: null,
      original_deadline: null,
      final_deadline: null,
      exam_date: null,
      date_status: 'NOT_ANNOUNCED',
      days_remaining: null,
    },
    extension_status: 'UNKNOWN',
    historical_extension_pattern:
      'Historical pattern: Registrations open mid-December (e.g. Dec 16 in 2024 and 2025); exam held on the final Sunday of March. 2027 date NOT announced officially.',
    target_students: ['Students seeking B.Tech / B.E. and B.Pharm admissions in Gujarat'],
    education_levels: ['Class 12', 'UG Aspirants'],
    eligibility: {
      academic: 'Class 12 Science stream (Group A for Engineering, Group B for Pharmacy, Group AB for both).',
      domicile: 'Gujarat domicile or secondary school completed in Gujarat.'
    },
    benefits: {
      details: '50% weightage in ACPC State Quota Engineering Merit Rank calculation.'
    },
    required_documents: [
      'Class 12 Science Roll Number / Hall Ticket',
      'Passport size photograph & signature scan',
      'Aadhaar Number'
    ],
    sources: [
      {
        label: 'GSEB Official Portal',
        url: 'https://gujcet.gseb.org/',
        source_level: 'OFFICIAL_PRIMARY'
      }
    ],
    official_source_found: true,
    official_source_url: 'https://gujcet.gseb.org/',
    source_level: 'OFFICIAL_PRIMARY',
    last_verified: '2026-10-03',
    verification_notes:
      'Third-party websites reporting exact March 2027 dates are projections. Notice2Action policy: dates remain null until GSHSEB gazettes the order.',
    matchReason: 'Important state entrance test benchmark for engineering and pharmacy admissions.',
    matchScore: 70
  },
  {
    id: 'EX-GSEB-SSC-2027',
    title: 'GSEB SSC (Class 10) Board Examination 2027',
    subtitle: 'Secondary School Certificate Annual Examination',
    type: 'exam',
    authority: 'Gujarat Secondary and Higher Secondary Education Board (GSHSEB)',
    scope: 'Gujarat',
    status: 'UPCOMING',
    urgencyLevel: 'medium',
    schedule: {
      academic_year: '2026-27',
      opening_date: '2026-11-01',
      original_deadline: '2026-12-15',
      final_deadline: '2026-12-15',
      exam_date: '2027-02-25 to 2027-03-17',
      date_status: 'OFFICIALLY_CONFIRMED',
      days_remaining: 145,
    },
    extension_status: 'NO_EXTENSION_FOUND_ON_OFFICIAL_PAGE',
    target_students: ['Students enrolled in Class 10 in GSEB affiliated schools'],
    education_levels: ['Class 10'],
    eligibility: {
      academic: 'Regular or external student enrolled in recognized Gujarat secondary school.'
    },
    benefits: {
      details: 'Qualifying certificate required for Diploma Polytechnic and Class 11 higher secondary admission.'
    },
    required_documents: [
      'School Enrolment Number',
      'Registration Fee Receipt (Female candidates exempt as per state policy)',
      'Birth Certificate & Caste Certificate'
    ],
    sources: [
      {
        label: 'GSEB Official Portal',
        url: 'https://gseb.org/',
        source_level: 'OFFICIAL_PRIMARY'
      }
    ],
    official_source_found: true,
    official_source_url: 'https://gseb.org/',
    source_level: 'OFFICIAL_PRIMARY',
    last_verified: '2026-10-03',
    verification_notes: 'Board examination schedule officially gazetted for 2027.',
    matchReason: 'Official dates confirmed for Class 10 board candidates.',
    matchScore: 50
  },
  {
    id: 'EX-GPSC-CLASS-1-2-2026',
    title: 'GPSC Combined Competitive Examination (Class 1 & 2)',
    subtitle: 'Gujarat Administrative Service (GAS) & Civil Services',
    type: 'exam',
    authority: 'Gujarat Public Service Commission',
    scope: 'Gujarat',
    status: 'OPEN',
    urgencyLevel: 'high',
    schedule: {
      academic_year: '2026-27',
      exam_date: '2026-10-05 to 2026-10-11 (Mains Examination)',
      date_status: 'OFFICIALLY_CONFIRMED',
      days_remaining: 2,
    },
    extension_status: 'NO_EXTENSION_ANNOUNCED',
    target_students: ['Graduates seeking Gujarat state executive civil service posts'],
    education_levels: ['UG', 'PG'],
    eligibility: {
      academic: 'Graduate in any discipline from a recognized statutory university.',
      domicile: 'Knowledge of Gujarati language compulsory.'
    },
    benefits: {
      details: 'Direct recruitment into Class 1 & Class 2 administrative cadres.'
    },
    required_documents: ['Mains Examination Hall Ticket', 'Government Photo ID Proof'],
    sources: [
      {
        label: 'GPSC Exam Calendar Portal',
        url: 'https://gpsc.gujarat.gov.in/ExamCalendarforUPSC',
        source_level: 'OFFICIAL_PRIMARY'
      }
    ],
    official_source_found: true,
    official_source_url: 'https://gpsc.gujarat.gov.in/',
    source_level: 'OFFICIAL_PRIMARY',
    last_verified: '2026-10-03',
    matchScore: 60
  },
  {
    id: 'ADM-ACPC-BE-2026-27',
    title: 'ACPC Degree Engineering (B.E. / B.Tech) Centralized Admissions',
    subtitle: 'Government, Grant-in-Aid & Self-Financed Engineering Seats',
    type: 'admission',
    authority: 'Admission Committee for Professional Courses (ACPC)',
    scope: 'Gujarat',
    status: 'COMPLETED',
    urgencyLevel: 'low',
    schedule: {
      academic_year: '2026-27',
      registration_open: '2026-03-31',
      registration_close: '2026-05-31',
      rounds_info: 'Round 1, Round 2 & Vacant Spot Rounds Concluded in August 2026',
      date_status: 'OFFICIALLY_CONFIRMED',
    },
    extension_status: 'NO_EXTENSION_ANNOUNCED',
    target_students: ['Class 12 Science graduates seeking engineering admission'],
    education_levels: ['UG'],
    eligibility: {
      academic:
        'Merit Formula: 50% Theory Board Percentile + 50% GUJCET Percentile (Reconciled from earlier 60:40 formula).',
      domicile: 'Gujarat domicile quota applies to 95% of government seats.'
    },
    benefits: {
      details: 'Unified single-window counseling for over 60,000 engineering seats across Gujarat.'
    },
    required_documents: ['GUJCET Scorecard', 'Class 12 Marksheet', 'School Leaving Certificate'],
    sources: [
      {
        label: 'ACPC Official Admissions Portal',
        url: 'https://gujacpc.admissions.nic.in/',
        source_level: 'OFFICIAL_PRIMARY'
      }
    ],
    official_source_found: true,
    official_source_url: 'https://acpc.gujarat.gov.in/be-b-tech',
    source_level: 'OFFICIAL_PRIMARY',
    last_verified: '2026-10-03',
    verification_notes:
      'Cycle 2026-27 is concluded. Next cycle (2027-28) expected to open late March 2027; dates currently null.',
    matchReason: 'ACPC Merit Formula confirmed as 50:50 Board Theory + GUJCET.',
    matchScore: 90
  },
  {
    id: 'SCHM-NAMO-LAKSHMI',
    title: 'Namo Lakshmi Yojana',
    subtitle: 'Direct Benefit Transfer Scheme for Secondary School Girls',
    type: 'scheme',
    authority: 'Education Department, Government of Gujarat',
    department: 'Gujarat Vidya Samiksha Kendra (VSK)',
    scope: 'Gujarat',
    status: 'OPEN',
    urgencyLevel: 'medium',
    schedule: {
      academic_year: '2026-27',
      rounds_info: 'Rolling DBT Onboarding managed through School Nodal Desks',
      date_status: 'OFFICIALLY_CONFIRMED',
    },
    extension_status: 'NO_EXTENSION_ANNOUNCED',
    target_students: ['Girls in Classes 9 to 12 across Government, Aided and Private Schools'],
    education_levels: ['Class 10', 'Class 11', 'Class 12'],
    eligibility: {
      academic: 'Satisfactory classroom attendance in recognized schools.',
      income: 'Family annual income <= ₹6,00,000.',
      domicile: 'Permanent resident of Gujarat.'
    },
    benefits: {
      total_assistance: '₹50,000 total across 4 secondary school years',
      details:
        'Class 9 & 10: ₹500/mo (₹5,000/yr) + ₹10,000 Board Pass bonus; Class 11 & 12: ₹750/mo (₹7,500/yr) + ₹15,000 Board Pass bonus.'
    },
    required_documents: ['Child Tracking System (CTS) ID', 'Mother / Student Aadhaar-linked Bank Account'],
    sources: [
      {
        label: 'VSK Namo Payments Portal',
        url: 'https://namopayments.gujaratvsk.org/',
        source_level: 'OFFICIAL_PRIMARY'
      }
    ],
    official_source_found: true,
    official_source_url: 'https://namopayments.gujaratvsk.org/',
    source_level: 'OFFICIAL_PRIMARY',
    last_verified: '2026-10-03',
    matchReason: 'Flagged for female secondary school family members.',
    matchScore: 65
  },
  {
    id: 'SCHM-NAMO-SARASWATI',
    title: 'Namo Saraswati Vigyan Sadhana Yojana',
    subtitle: 'STEM Incentive Grant for Higher Secondary Science Students',
    type: 'scheme',
    authority: 'Education Department, Government of Gujarat',
    department: 'Vidya Samiksha Kendra (VSK)',
    scope: 'Gujarat',
    status: 'OPEN',
    urgencyLevel: 'medium',
    schedule: {
      academic_year: '2026-27',
      rounds_info: 'Active DBT Verification for Enrolled Class 11-12 Science Batches',
      date_status: 'OFFICIALLY_CONFIRMED',
    },
    extension_status: 'NO_EXTENSION_ANNOUNCED',
    target_students: ['Both male & female students entering Class 11 & 12 Science stream'],
    education_levels: ['Class 11', 'Class 12'],
    eligibility: {
      academic: 'Admitted in Class 11 Science (Group A, B, or AB) after clearing Class 10.',
      income: 'Family income <= ₹6,00,000 per annum.'
    },
    benefits: {
      total_assistance: '₹25,000 total over 2 years',
      details: 'Class 11 Science: ₹1,000/month for 10 months; Class 12 Science: ₹1,500/month for 10 months.'
    },
    required_documents: ['Child Tracking ID (CTS)', 'Class 10 Marksheet', 'Aadhaar linked bank account'],
    sources: [
      {
        label: 'VSK Portal',
        url: 'https://namopayments.gujaratvsk.org/',
        source_level: 'OFFICIAL_PRIMARY'
      }
    ],
    official_source_found: true,
    official_source_url: 'https://namopayments.gujaratvsk.org/',
    source_level: 'OFFICIAL_PRIMARY',
    last_verified: '2026-10-03',
    matchScore: 70
  },
  {
    id: 'SCHM-NAMO-TABLET-AUDIT',
    title: 'NAMO e-Tablet Scheme (Policy Status Audit)',
    subtitle: 'Historical Hardware Scheme — Operational Review',
    type: 'scheme',
    authority: 'Education Department / KCG',
    scope: 'Gujarat',
    status: 'NEEDS_VERIFICATION',
    urgencyLevel: 'low',
    schedule: {
      academic_year: '2026-27',
      rounds_info: 'Hardware Procurement Paused; Scheme Inactive on Ground',
      date_status: 'UNVERIFIED',
    },
    extension_status: 'UNKNOWN',
    target_students: ['First year college / polytechnic students'],
    education_levels: ['Diploma', 'UG'],
    eligibility: {
      academic: 'Originally provided subsidized 7-inch tablets for ₹1,000 token fee.',
      income: 'No income criterion in original resolution.'
    },
    benefits: {
      details:
        'CRITICAL INTELLIGENCE: State Assembly disclosures confirm hardware procurement has been suspended. Funds redirected to direct benefit transfers (Namo Lakshmi & Saraswati). Avoid unverified vendor links claiming active 2026 tablet registration.'
    },
    required_documents: [],
    sources: [
      {
        label: 'KCG Portal (Historical Index)',
        url: 'https://kcg.gujarat.gov.in/namo-e-tablet-scheme',
        source_level: 'OFFICIAL_PRIMARY'
      }
    ],
    official_source_found: true,
    official_source_url: 'https://kcg.gujarat.gov.in/namo-e-tablet-scheme',
    source_level: 'OFFICIAL_PRIMARY',
    last_verified: '2026-10-03',
    verification_notes:
      'Unresolved conflict: Web aggregators list active 2026 tablet registrations; legislative records confirm paused distribution.',
    matchScore: 30
  },
  {
    id: 'EX-GTU-SEM-EXAM',
    title: 'GTU University Semester Examinations (Winter / Summer Cycles)',
    subtitle: 'Gujarat Technological University (BE / B.Tech / Diploma / ME / MBA / MCA)',
    type: 'exam',
    authority: 'Gujarat Technological University (GTU)',
    scope: 'Gujarat',
    status: 'OPEN',
    urgencyLevel: 'medium',
    schedule: {
      academic_year: '2026-27',
      rounds_info: 'Semester 3, 5, 7 Winter Regular/Remedial (Dec-Jan); Semester 4, 6, 8 Summer Sessions (May-June)',
      date_status: 'OFFICIALLY_CONFIRMED',
    },
    extension_status: 'NO_EXTENSION_ANNOUNCED',
    target_students: ['Students enrolled in GTU affiliated degree and diploma engineering colleges'],
    education_levels: ['Diploma', 'UG', 'PG'],
    eligibility: {
      academic: 'Enrolled student in GTU affiliated institute with required term-work and attendance completion.',
    },
    benefits: {
      details: 'Semester credit progression and degree certificate award from Gujarat Technological University.'
    },
    required_documents: ['GTU Student Hall Ticket', 'College Identity Card', 'Exam Fee Receipt'],
    sources: [
      {
        label: 'GTU Official Timetable Portal',
        url: 'https://timetable.gtu.ac.in/',
        source_level: 'OFFICIAL_PRIMARY'
      },
      {
        label: 'GTU Official Website',
        url: 'https://www.gtu.ac.in/',
        source_level: 'OFFICIAL_PRIMARY'
      }
    ],
    official_source_found: true,
    official_source_url: 'https://www.gtu.ac.in/',
    source_level: 'OFFICIAL_PRIMARY',
    last_verified: '2026-10-03',
    matchReason: 'Semester examinations for GTU degree and diploma engineering students.',
    matchScore: 85
  }
];
