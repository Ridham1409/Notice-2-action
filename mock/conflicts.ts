import { SourceConflict } from '@/types';

export const mockConflicts: SourceConflict[] = [
  {
    id: 'CONF-ACPC-FORMULA',
    topic: 'ACPC Degree Engineering Merit Rank Formula',
    sources: [
      {
        claim: '60% Board Theory + 40% GUJCET Percentile',
        source: 'Outdated aggregators (Collegedunia, GetMyUni)'
      },
      {
        claim: '50% Board Theory + 50% GUJCET Percentile',
        source: 'ACPC Official Gazette & Statutory Admission Rules'
      }
    ],
    resolved_value: '50% Class 12 Board Theory Percentile + 50% GUJCET Percentile',
    reason:
      'ACPC officially updated to the equal 50:50 percentile distribution under state technical education rules. Unofficial third-party portals persist obsolete 60:40 formulas from previous cycles.',
    status: 'OFFICIALLY_CONFIRMED',
    last_verified: '2026-10-03'
  },
  {
    id: 'CONF-GSSSB-VACANCIES',
    topic: 'GSSSB CCE (Advt 378/2025-26) Vacancy Count',
    sources: [
      {
        claim: '5,370 vacancies total',
        source: 'Initial February 2026 Notification'
      },
      {
        claim: '7,338 vacancies total',
        source: 'Official Corrigendum & Departmental Quota Expansion'
      }
    ],
    resolved_value: '7,338 Verified State Vacancies',
    reason:
      'The Gujarat Subordinate Service Selection Board published an official corrigendum increasing Group A and Group B clerical and executive posts.',
    status: 'OFFICIALLY_CONFIRMED',
    last_verified: '2026-10-03'
  },
  {
    id: 'CONF-TABLET-STATUS',
    topic: 'NAMO E-Tablet Scheme Distribution Status for 2026',
    sources: [
      {
        claim: 'Active 2026 Online Registration Open on portal',
        source: 'Commercial blogs and fake scheme portals'
      },
      {
        claim: 'Hardware procurement paused; funds redirected to DBT',
        source: 'State Assembly legislative records & Departmental budget'
      }
    ],
    resolved_value: 'Hardware distribution paused; Replaced by Namo Lakshmi/Saraswati cash transfers',
    reason:
      'While the scheme remains listed on historical web directories, physical tablet distribution has ceased in favor of direct student financial assistance.',
    status: 'OFFICIALLY_CONFIRMED',
    last_verified: '2026-10-03'
  }
];
