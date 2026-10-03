import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { OpportunityType, OpportunityStatus } from '@/types';

export interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedType: OpportunityType | 'all';
  onTypeChange: (type: OpportunityType | 'all') => void;
  selectedStatus: OpportunityStatus | 'all';
  onStatusChange: (status: OpportunityStatus | 'all') => void;
  selectedLevel: string;
  onLevelChange: (level: string) => void;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedStatus,
  onStatusChange,
  selectedLevel,
  onLevelChange,
  onReset,
}) => {
  const [showMoreFilters, setShowMoreFilters] = React.useState(false);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedType !== 'all' ||
    selectedStatus !== 'all' ||
    selectedLevel !== 'all';

  const typeChips: { id: OpportunityType | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'scholarship', label: 'Scholarships' },
    { id: 'exam', label: 'Exams' },
    { id: 'admission', label: 'Admissions' },
  ];

  return (
    <div className="space-y-3">
      {/* Top Search Bar & Category Chips */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search scholarships, exams, admissions (e.g. MYSY, GUJCET)..."
            className="w-full rounded-xl border border-border bg-white pl-10 pr-9 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 shadow-sm transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter Toggle Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
              selectedStatus !== 'all' || selectedLevel !== 'all' || showMoreFilters
                ? 'border-primary-300 bg-primary-50 text-primary-800'
                : 'border-border bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filter</span>
            {(selectedStatus !== 'all' || selectedLevel !== 'all') && (
              <span className="h-2 w-2 rounded-full bg-primary-600 ml-0.5" />
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Reset all filters"
            >
              <X className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {typeChips.map((chip) => {
          const isActive = selectedType === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => onTypeChange(chip.id)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Expandable Advanced Filters */}
      {showMoreFilters && (
        <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-wrap items-center gap-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => onStatusChange(e.target.value as OpportunityStatus | 'all')}
              className="rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="all">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="EXTENDED">Extended</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="COMPLETED">Concluded</option>
              <option value="NOT_ANNOUNCED">Not Announced</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Education Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => onLevelChange(e.target.value)}
              className="rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-primary-500"
            >
              <option value="all">All Levels</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 12">Class 12</option>
              <option value="Diploma">Diploma</option>
              <option value="UG">Undergraduate (UG)</option>
              <option value="PG">Postgraduate (PG)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
