'use client';

import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { StudentProfile, Opportunity } from '@/types';
import { profileService } from '@/services/profileService';
import { opportunityService } from '@/services/opportunityService';
import { actionService } from '@/services/actionService';
import { studentOpportunityService, StudentOpportunitySummary } from '@/services/studentOpportunityService';
import { Sparkles, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState<StudentProfile>(profileService.getProfile());
  const [summary, setSummary] = useState<StudentOpportunitySummary | null>(null);
  const [plannedOppIds, setPlannedOppIds] = useState<string[]>([]);
  const [showIneligible, setShowIneligible] = useState(false);

  const loadData = async (student: StudentProfile) => {
    const res = await studentOpportunityService.getStudentOpportunities(student);
    setSummary(res);
    const plans = actionService.getActionPlan(student.id);
    setPlannedOppIds(plans.map((p) => p.opportunityId).filter(Boolean) as string[]);
  };

  useEffect(() => {
    const current = profileService.getProfile();
    setProfile(current);
    loadData(current);

    // Subscribe to reactive profile updates
    const unsubscribe = profileService.subscribe((updatedProfile) => {
      setProfile(updatedProfile);
      loadData(updatedProfile);
    });

    return () => unsubscribe();
  }, []);

  const handleProfileSaved = (updated: StudentProfile) => {
    setProfile(updated);
    loadData(updated);
  };

  const handleAddToPlan = (opp: Opportunity) => {
    actionService.addItem({
      title: `Apply for ${opp.title}`,
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      type: opp.type,
      deadline: opp.schedule.final_deadline || opp.schedule.extended_deadline || 'Upcoming',
      priority: opp.urgencyLevel === 'high' ? 'HIGH' : 'MEDIUM',
      status: 'PENDING',
      categoryTimeframe: 'TODAY',
      documents: opp.required_documents.slice(0, 4).map((d) => ({ name: d, checked: false })),
      notes: `Target benefit: ${
        opp.benefits.amount || opp.benefits.tuition || 'Verified Gujarat assistance'
      }`,
      officialUrl: opp.official_source_url,
    });
    setPlannedOppIds((prev) => [...prev, opp.id]);
  };

  const bestMatches = summary?.bestMatches || [];
  const needsVerification = summary?.needsVerification || [];
  const notEligible = summary?.notEligible || [];

  return (
    <AppLayout
      title="Student Profile"
      subtitle="Keep your academic details updated for accurate scholarship and admission matches."
    >
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
        {/* Profile Form */}
        <ProfileForm onSaved={handleProfileSaved} />

        {/* Live Matching Engine Results */}
        <div className="space-y-6 pt-6 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Best Matches For Your Profile ({bestMatches.length})
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Automatically matched for: {profile.academicLevel} • {profile.courseStream} • {profile.category} • Family Income ₹{profile.annualFamilyIncome.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          {/* SECTION 1: BEST MATCHES */}
          {bestMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {bestMatches.map((item) => (
                <div key={item.opportunity.id} className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>✓ You Appear Eligible ({item.matchScore}%)</span>
                  </div>
                  <OpportunityCard
                    opportunity={item.opportunity}
                    onAddToPlan={handleAddToPlan}
                    isAddedToPlan={plannedOppIds.includes(item.opportunity.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">
              No high-confidence eligible schemes found for the current combination. Update your income or percentile if changed.
            </p>
          )}

          {/* SECTION 2: NEEDS VERIFICATION (If Any) */}
          {needsVerification.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span>Needs Additional Information ({needsVerification.length})</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {needsVerification.map((item) => (
                  <div key={item.opportunity.id} className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      <span>Needs Verification ({item.matchScore}%)</span>
                    </div>
                    <OpportunityCard
                      opportunity={item.opportunity}
                      onAddToPlan={handleAddToPlan}
                      isAddedToPlan={plannedOppIds.includes(item.opportunity.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 3: INELIGIBLE SCHEMES (COLLAPSIBLE) */}
          {notEligible.length > 0 && (
            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowIneligible(!showIneligible)}
                className="flex items-center justify-between w-full p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
              >
                <span>View Ineligible Schemes ({notEligible.length}) & Reasons</span>
                {showIneligible ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {showIneligible && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4 animate-in fade-in">
                  {notEligible.map((item) => (
                    <div key={item.opportunity.id} className="space-y-2 opacity-80 hover:opacity-100 transition-opacity">
                      <div className="text-[11px] font-semibold text-rose-800 bg-rose-50 p-2 rounded-lg border border-rose-200 leading-tight">
                        ✕ {item.summaryReason}
                      </div>
                      <OpportunityCard
                        opportunity={item.opportunity}
                        onAddToPlan={handleAddToPlan}
                        isAddedToPlan={plannedOppIds.includes(item.opportunity.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
