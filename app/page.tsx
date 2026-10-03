'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { AttentionCard } from '@/components/dashboard/AttentionCard';
import { Button } from '@/components/ui/Button';
import { opportunityService } from '@/services/opportunityService';
import { actionService } from '@/services/actionService';
import { profileService } from '@/services/profileService';
import { Opportunity, StudentProfile } from '@/types';
import {
  Sparkles,
  ArrowRight,
  UploadCloud,
  CheckCircle2,
  Calendar,
  Compass,
} from 'lucide-react';

export default function DashboardPage() {
  const [student, setStudent] = useState<StudentProfile>(profileService.getProfile());
  const [importantForYou, setImportantForYou] = useState<Opportunity[]>([]);
  const [deadlinesComingUp, setDeadlinesComingUp] = useState<Opportunity[]>([]);
  const [plannedOppIds, setPlannedOppIds] = useState<string[]>([]);
  const [pendingTasksCount, setPendingTasksCount] = useState<number>(0);

  useEffect(() => {
    async function loadData() {
      const p = profileService.getProfile();
      setStudent(p);

      // Load matched / top opportunities for student
      const matches = await opportunityService.getMatchedOpportunities(p);
      const eligible = matches
        .filter((m) => m.eligibility.eligible === true)
        .map((m) => ({ ...m.opportunity, matchReason: m.summaryReason }));
      const oppList = eligible.length > 0 ? eligible : await opportunityService.getAll();
      setImportantForYou(oppList.slice(0, 3));

      // Load urgent deadlines
      const urgent = await opportunityService.getAttentionItems();
      setDeadlinesComingUp(urgent.slice(0, 3));

      // Load saved tasks
      const actions = actionService.getActionPlan();
      setPlannedOppIds(actions.map((a) => a.opportunityId).filter(Boolean) as string[]);
      setPendingTasksCount(actions.filter((a) => a.status !== 'COMPLETED').length);
    }
    loadData();

    // Subscribe to profile changes
    const unsubscribe = profileService.subscribe(async (updatedProfile) => {
      setStudent(updatedProfile);
      const matches = await opportunityService.getMatchedOpportunities(updatedProfile);
      const eligible = matches
        .filter((m) => m.eligibility.eligible === true)
        .map((m) => ({ ...m.opportunity, matchReason: m.summaryReason }));
      const oppList = eligible.length > 0 ? eligible : await opportunityService.getAll();
      setImportantForYou(oppList.slice(0, 3));
    });

    return () => unsubscribe();
  }, []);

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
    setPendingTasksCount((prev) => prev + 1);
  };

  const studentFirstName = student.fullName ? student.fullName.split(' ')[0] : 'Student';

  return (
    <AppLayout
      title={`Good morning, ${studentFirstName} 👋`}
      subtitle={`${student.courseStream || 'Undergraduate'} • ${student.boardUniversity || 'Gujarat'}`}
    >
      <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
        {/* SECTION 1: IMPORTANT FOR YOU */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Important For You
              </h2>
              <p className="text-xs text-slate-500">
                Top opportunities matched to your profile and academic stream
              </p>
            </div>
            <Link
              href="/opportunities"
              className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {importantForYou.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                onAddToPlan={handleAddToPlan}
                isAddedToPlan={plannedOppIds.includes(opp.id)}
              />
            ))}
          </div>
        </section>

        {/* SECTION 2: DEADLINES COMING UP */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>Deadlines Coming Up</span>
                <span className="text-xs font-normal text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                  Time-sensitive
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Government cutoffs and scheme registrations closing soon
              </p>
            </div>
            <Link
              href="/action-plan"
              className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors flex items-center gap-1"
            >
              <span>My tasks ({pendingTasksCount})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {deadlinesComingUp.map((opp) => (
              <AttentionCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        </section>

        {/* SECTION 3: ASK AI CTA */}
        <section>
          <div className="rounded-3xl bg-gradient-to-br from-primary-900 via-slate-900 to-slate-950 p-6 sm:p-8 text-white shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-500/20 border border-primary-400/30 text-primary-300 text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Notice2Action AI</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Have questions about your education?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Ask about MYSY, Digital Gujarat scholarships, ACPC engineering admissions, GUJCET,
                or upload an official government notice PDF to get instant step-by-step guidance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link href="/assistant">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Ask AI
                </Button>
              </Link>
              <Link href="/notices">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full sm:w-auto bg-white/10 text-white border-white/20 hover:bg-white/20"
                  leftIcon={<UploadCloud className="h-4 w-4" />}
                >
                  Upload Notice
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
