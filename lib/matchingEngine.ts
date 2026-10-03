import { StudentProfile, Opportunity } from '@/types';
import { evaluateEligibility, EligibilityResult } from './eligibilityEngine';

export interface MatchedOpportunity {
  opportunity: Opportunity;
  eligibility: EligibilityResult;
  matchLevel: 'HIGH MATCH' | 'MEDIUM MATCH' | 'LOW MATCH' | 'NOT ELIGIBLE' | 'NEEDS MORE INFORMATION';
  matchScore: number; // 0 - 100
  summaryReason: string;
}

/**
 * Deterministic Matching Engine:
 * Ranks all available opportunities for a given student using the Eligibility Engine,
 * deadline urgency, and educational stream alignment.
 */
export function rankOpportunitiesForStudent(
  student: StudentProfile,
  opportunities: Opportunity[]
): MatchedOpportunity[] {
  const results: MatchedOpportunity[] = [];

  for (const opp of opportunities) {
    const el = evaluateEligibility(student, opp);

    let matchLevel: MatchedOpportunity['matchLevel'] = 'LOW MATCH';
    let baseScore = el.score;

    if (el.eligible === false) {
      matchLevel = 'NOT ELIGIBLE';
      baseScore = Math.min(baseScore, 35);
    } else if (el.eligible === 'unknown') {
      matchLevel = 'NEEDS MORE INFORMATION';
    } else {
      // Eligible
      if (el.score >= 80) {
        matchLevel = 'HIGH MATCH';
      } else if (el.score >= 60) {
        matchLevel = 'MEDIUM MATCH';
      } else {
        matchLevel = 'LOW MATCH';
      }
    }

    // Deadline urgency adjustment (+5 if deadline within 30 days and currently open/extended)
    if (opp.schedule.days_remaining !== undefined && opp.schedule.days_remaining !== null) {
      if (opp.schedule.days_remaining <= 30 && opp.schedule.days_remaining > 0 && el.eligible === true) {
        baseScore = Math.min(100, baseScore + 5);
      }
    }

    // Build human-readable summary reason
    let summaryReason = '';
    if (el.eligible === true) {
      summaryReason = `Eligible based on ${student.courseStream}, ${student.percentageOrCgpa}, family income (₹${student.annualFamilyIncome.toLocaleString('en-IN')}) within limit, and Gujarat domicile.`;
    } else if (el.eligible === false) {
      summaryReason = `Ineligible: ${el.failedCriteria.join('; ')}`;
    } else {
      summaryReason = `Verification needed: ${el.missingInformation.join(', ')}`;
    }

    results.push({
      opportunity: {
        ...opp,
        matchScore: baseScore,
        matchReason: summaryReason,
      },
      eligibility: el,
      matchLevel,
      matchScore: baseScore,
      summaryReason,
    });
  }

  // Sort descending by matchScore, then by days_remaining
  results.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    const daysA = a.opportunity.schedule.days_remaining ?? 999;
    const daysB = b.opportunity.schedule.days_remaining ?? 999;
    return daysA - daysB;
  });

  return results;
}
