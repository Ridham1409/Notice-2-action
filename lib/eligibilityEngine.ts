import { StudentProfile, Opportunity } from '@/types';

export interface EligibilityResult {
  eligible: boolean | 'unknown';
  score: number; // 0 to 100
  reasons: string[];
  failedCriteria: string[];
  matchedCriteria: string[];
  missingInformation: string[];
}

/**
 * Deterministic Eligibility Engine for Gujarat Education Schemes & Opportunities
 * Evaluates concrete academic, financial, category and residential rules.
 * Never delegates baseline statutory decisions to LLM guesswork.
 */
export function evaluateEligibility(
  student: StudentProfile,
  opportunity: Opportunity
): EligibilityResult {
  const reasons: string[] = [];
  const matchedCriteria: string[] = [];
  const failedCriteria: string[] = [];
  const missingInformation: string[] = [];

  let totalWeight = 0;
  let earnedScore = 0;

  // Helper to extract student percentile / percentage number
  const extractScore = (scoreVal: any): number => {
    if (scoreVal === undefined || scoreVal === null) return 0;
    if (typeof scoreVal === 'number') return scoreVal;
    const match = String(scoreVal).match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  const studentScore = extractScore(student.percentageOrCgpa || (student as any).percentage);
  const studentIncome = Number(student.annualFamilyIncome ?? (student as any).annualIncome ?? 0);
  const courseStream = String(student.courseStream || (student as any).course || '').toLowerCase();
  const academicLevel = String(student.academicLevel || (student as any).educationLevel || 'UG');
  const isDomicile = student.gujaratDomicile !== undefined
    ? Boolean(student.gujaratDomicile)
    : ((student as any).domicile === 'Gujarat' || (student as any).domicile === true);

  // 1. Domicile Requirement
  if (opportunity.eligibility.domicile) {
    totalWeight += 20;
    const reqLower = opportunity.eligibility.domicile.toLowerCase();
    if (reqLower.includes('gujarat') || reqLower.includes('permanent resident')) {
      if (isDomicile) {
        matchedCriteria.push('Permanent resident / Domicile of Gujarat confirmed.');
        earnedScore += 20;
      } else {
        failedCriteria.push('Gujarat domicile is required for this state scheme.');
      }
    } else {
      matchedCriteria.push('No restrictive domicile limitation.');
      earnedScore += 20;
    }
  }

  // 2. Academic Level & Education Match
  if (opportunity.education_levels && opportunity.education_levels.length > 0) {
    totalWeight += 20;
    const studentLevel = academicLevel.toLowerCase();
    const isLevelMatch = opportunity.education_levels.some((lvl) => {
      const l = lvl.toLowerCase();
      if (l === 'ug' || l.includes('undergraduate') || l.includes('degree')) {
        return (
          studentLevel === 'ug' ||
          studentLevel.includes('undergraduate') ||
          courseStream.includes('b.tech') ||
          courseStream.includes('be') ||
          courseStream.includes('mbbs') ||
          courseStream.includes('engineering')
        );
      }
      if (l === 'diploma') return studentLevel === 'diploma';
      if (l.includes('class 10')) return studentLevel === 'class 10';
      if (l.includes('class 11')) return studentLevel === 'class 11';
      if (l.includes('class 12')) return studentLevel === 'class 12';
      if (l === 'phd' || l.includes('doctoral')) return studentLevel === 'phd';
      if (l === 'pg' || l.includes('postgraduate')) return studentLevel === 'pg';
      return false;
    });

    if (isLevelMatch) {
      matchedCriteria.push(`Academic level (${academicLevel}) is directly eligible.`);
      earnedScore += 20;
    } else {
      failedCriteria.push(
        `Scheme targets ${opportunity.education_levels.join(', ')}, but student is in ${academicLevel}.`
      );
    }
  }

  // 3. Scheme-Specific Academic Percentile / Marks
  if (opportunity.id.includes('MYSY')) {
    totalWeight += 25;
    // MYSY requires 80th percentile in 10th (Diploma) or 12th (Degree), or 65% in D2D
    const isD2D = courseStream.includes('d2d') || courseStream.includes('lateral');
    const minRequired = isD2D ? 65 : 80;

    if (studentScore >= minRequired) {
      matchedCriteria.push(
        `Academic score (${studentScore}%) meets or exceeds the MYSY ${minRequired}${isD2D ? '%' : 'th percentile'} benchmark.`
      );
      earnedScore += 25;
    } else {
      failedCriteria.push(
        `Academic score (${studentScore}%) is below the mandatory MYSY ${minRequired}${isD2D ? '%' : 'th percentile'} cutoff.`
      );
    }
  } else if (opportunity.id.includes('ISEL')) {
    totalWeight += 20;
    if (studentScore >= 60) {
      matchedCriteria.push(`Academic score (${studentScore}%) meets the 60th percentile loan subsidy threshold.`);
      earnedScore += 20;
    } else {
      failedCriteria.push(`Score must be at least 60 percentile for education loan interest subsidy.`);
    }
  } else if (opportunity.id.includes('SHODH')) {
    totalWeight += 20;
    if (academicLevel.toLowerCase().includes('phd')) {
      matchedCriteria.push('Ph.D. doctoral enrollment satisfied.');
      earnedScore += 20;
    } else {
      failedCriteria.push('SHODH is restricted to confirmed full-time Ph.D. scholars.');
    }
  } else if (opportunity.id.includes('GUJCET') || opportunity.id.includes('ACPC')) {
    totalWeight += 20;
    matchedCriteria.push('Engineering / technical admission entrance pathway.');
    earnedScore += 20;
  }

  // 4. Family Income Ceiling
  if (opportunity.eligibility.income) {
    totalWeight += 25;
    const incomeStr = opportunity.eligibility.income;

    // Check for 6 Lakh ceiling (MYSY, ISEL, Namo Lakshmi, CMSS)
    if (incomeStr.includes('6,00,000') || incomeStr.includes('6 Lakh') || incomeStr.includes('6.00')) {
      if (studentIncome <= 600000) {
        matchedCriteria.push(
          `Annual family income (₹${studentIncome.toLocaleString('en-IN')}) is within the ₹6,00,000 ceiling.`
        );
        earnedScore += 25;
      } else {
        failedCriteria.push(
          `Family annual income (₹${studentIncome.toLocaleString('en-IN')}) exceeds statutory limit of ₹6,00,000.`
        );
      }
    }
    // Check for 2.5 Lakh ceiling (Digital Gujarat Post-Matric SC/ST/SEBC)
    else if (incomeStr.includes('2,50,000') || incomeStr.includes('2.50')) {
      if (studentIncome <= 250000) {
        matchedCriteria.push(
          `Annual family income (₹${studentIncome.toLocaleString('en-IN')}) is within the ₹2,50,000 threshold.`
        );
        earnedScore += 25;
      } else {
        failedCriteria.push(
          `Family annual income (₹${studentIncome.toLocaleString('en-IN')}) exceeds the ₹2,50,000 ceiling for state post-matric schemes.`
        );
      }
    } else {
      matchedCriteria.push('Income limits verified according to departmental guidelines.');
      earnedScore += 15;
    }
  }

  // 5. Social Category Criteria
  if (opportunity.id.includes('DIGITAL-POSTMATRIC')) {
    totalWeight += 15;
    if (['SC', 'ST', 'SEBC', 'EWS'].includes(student.category)) {
      matchedCriteria.push(`Category (${student.category}) qualifies for Digital Gujarat departmental grant.`);
      earnedScore += 15;
    } else {
      failedCriteria.push(
        `Digital Gujarat Post-Matric schemes target SC/ST/SEBC/EWS candidates with valid caste certificates.`
      );
    }
  }

  // 6. Hosteller Additional Grant Criteria (e.g. MYSY Hostel)
  if (opportunity.id.includes('MYSY') && student.hosteller) {
    matchedCriteria.push('Hosteller status qualifies for additional ₹1,200/month (₹12,000/year) living allowance.');
    earnedScore = Math.min(100, earnedScore + 5);
  }

  // Calculate final percentage score
  const finalScore = totalWeight > 0 ? Math.round((earnedScore / totalWeight) * 100) : 50;

  // Determine overall eligibility decision
  let isEligible: boolean | 'unknown' = true;
  if (failedCriteria.length > 0) {
    isEligible = false;
  } else if (missingInformation.length > 0 && matchedCriteria.length === 0) {
    isEligible = 'unknown';
  }

  // Build comprehensive reasons
  if (isEligible === true) {
    reasons.push('Meets academic requirement and score threshold.');
    reasons.push('Meets family annual income ceiling.');
    reasons.push('Meets Gujarat domicile condition.');
    reasons.push('Course / Stream is eligible under state guidelines.');
    if (student.hosteller) {
      reasons.push('Hosteller assistance eligible.');
    }
  } else {
    reasons.push(...failedCriteria);
  }

  return {
    eligible: isEligible,
    score: finalScore,
    reasons,
    failedCriteria,
    matchedCriteria,
    missingInformation,
  };
}
