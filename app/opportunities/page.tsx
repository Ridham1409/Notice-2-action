'use client';

import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { FilterBar } from '@/components/opportunities/FilterBar';
import { OpportunityCardSkeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { opportunityService } from '@/services/opportunityService';
import { actionService } from '@/services/actionService';
import { Opportunity, OpportunityType, OpportunityStatus } from '@/types';
import { Compass, Sparkles, Filter } from 'lucide-react';

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<OpportunityType | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<OpportunityStatus | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [plannedOppIds, setPlannedOppIds] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(6);

  useEffect(() => {
    loadOpportunities();
    const plans = actionService.getActionPlan();
    setPlannedOppIds(plans.map((p) => p.opportunityId).filter(Boolean) as string[]);
  }, [searchQuery, selectedType, selectedStatus, selectedLevel]);

  const loadOpportunities = async () => {
    setIsLoading(true);
    try {
      const data = await opportunityService.searchAndFilter({
        query: searchQuery,
        type: selectedType,
        status: selectedStatus,
        educationLevel: selectedLevel,
      });
      setOpportunities(data);
      setVisibleCount(6);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedStatus('all');
    setSelectedLevel('all');
  };

  const handleAddToPlan = (opp: Opportunity) => {
    actionService.addItem({
      title: `Apply / Register: ${opp.title}`,
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      type: opp.type,
      deadline: opp.schedule.final_deadline || opp.schedule.extended_deadline || 'Upcoming',
      priority: opp.urgencyLevel === 'high' ? 'HIGH' : 'MEDIUM',
      status: 'PENDING',
      categoryTimeframe: 'TODAY',
      documents: opp.required_documents.slice(0, 4).map((d) => ({ name: d, checked: false })),
      notes: `Added from Opportunities directory. Target benefit: ${
        opp.benefits.amount || opp.benefits.tuition || 'Gujarat state assistance'
      }`,
      officialUrl: opp.official_source_url,
    });
    setPlannedOppIds((prev) => [...prev, opp.id]);
  };

  const visibleOpportunities = opportunities.slice(0, visibleCount);

  return (
    <AppLayout
      title="Opportunities Directory"
      subtitle="Find verified Gujarat scholarships, admissions, and entrance exams."
    >
      <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
        {/* Search & Filters */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          onReset={handleResetFilters}
        />

        {/* Results Count Header */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Showing <strong className="text-slate-900">{visibleOpportunities.length}</strong> of{' '}
            <strong className="text-slate-900">{opportunities.length}</strong> opportunities
          </span>
        </div>

        {/* Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <OpportunityCardSkeleton key={i} />
            ))}
          </div>
        ) : opportunities.length === 0 ? (
          <EmptyState
            title="No opportunities found"
            description="Try changing your search terms or clearing filters."
            actionText="Clear All Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleOpportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  onAddToPlan={handleAddToPlan}
                  isAddedToPlan={plannedOppIds.includes(opp.id)}
                />
              ))}
            </div>

            {/* Show More Button */}
            {visibleCount < opportunities.length && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-800 transition-colors shadow-sm"
                >
                  Show More Opportunities ({opportunities.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
