'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { OpportunityDetail } from '@/components/opportunities/OpportunityDetail';
import { OpportunityCardSkeleton } from '@/components/ui/Skeleton';
import { ErrorState } from '@/components/ui/ErrorState';
import { opportunityService } from '@/services/opportunityService';
import { actionService } from '@/services/actionService';
import { Opportunity } from '@/types';

export default function OpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddedToPlan, setIsAddedToPlan] = useState(false);

  useEffect(() => {
    async function loadOpportunity() {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await opportunityService.getById(id);
        if (data) {
          setOpportunity(data);
          const plans = actionService.getActionPlan();
          setIsAddedToPlan(plans.some((p) => p.opportunityId === data.id));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadOpportunity();
  }, [id]);

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
      documents: opp.required_documents.map((d) => ({ name: d, checked: false })),
      notes: `Target assistance: ${
        opp.benefits.amount || opp.benefits.tuition || 'Gujarat state assistance'
      }`,
      officialUrl: opp.official_source_url,
    });
    setIsAddedToPlan(true);
  };

  return (
    <AppLayout
      title={opportunity ? opportunity.title : 'Opportunity Details'}
      subtitle="Verified Gujarat Education Intelligence & Application Rules"
    >
      <div className="py-2">
        {isLoading ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <OpportunityCardSkeleton />
            <OpportunityCardSkeleton />
          </div>
        ) : !opportunity ? (
          <ErrorState
            title="Opportunity Not Found"
            message={`We could not locate an opportunity with ID "${id}". It may have been archived or updated in the current academic cycle.`}
            onBack={() => router.push('/opportunities')}
          />
        ) : (
          <OpportunityDetail
            opportunity={opportunity}
            onAddToPlan={handleAddToPlan}
            isAddedToPlan={isAddedToPlan}
          />
        )}
      </div>
    </AppLayout>
  );
}
