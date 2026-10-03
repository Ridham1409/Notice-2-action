import React from 'react';
import { ActionPlanItem } from '@/types';
import { ActionCard } from './ActionCard';
import { Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { EmptyState } from '../ui/EmptyState';

export interface ActionTimelineProps {
  items: ActionPlanItem[];
  onToggleComplete: (id: string) => void;
  onToggleDoc: (id: string, docIndex: number) => void;
  onDelete: (id: string) => void;
  onAddCustom?: () => void;
}

export const ActionTimeline: React.FC<ActionTimelineProps> = ({
  items,
  onToggleComplete,
  onToggleDoc,
  onDelete,
  onAddCustom,
}) => {
  const todayItems = items.filter(
    (item) => item.categoryTimeframe === 'TODAY' && item.status !== 'COMPLETED'
  );
  const upcomingItems = items.filter(
    (item) => item.categoryTimeframe === 'UPCOMING' && item.status !== 'COMPLETED'
  );
  const completedItems = items.filter((item) => item.status === 'COMPLETED');

  if (items.length === 0) {
    return (
      <EmptyState
        title="No tasks yet"
        description="Add tasks from Opportunities, the AI Assistant, or Government Notices to track your deadlines."
        actionText="Find Opportunities"
        onAction={onAddCustom}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* SECTION: TODAY / IMMEDIATE ATTENTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-900">
              Due Soon ({todayItems.length})
            </h3>
          </div>
        </div>

        {todayItems.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">
            No urgent tasks due right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {todayItems.map((item) => (
              <ActionCard
                key={item.id}
                item={item}
                onToggleComplete={onToggleComplete}
                onToggleDoc={onToggleDoc}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* SECTION: UPCOMING HORIZON */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-border">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <h3 className="text-sm font-bold text-slate-900">
              Upcoming ({upcomingItems.length})
            </h3>
          </div>
        </div>

        {upcomingItems.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-2">
            No other upcoming tasks.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {upcomingItems.map((item) => (
              <ActionCard
                key={item.id}
                item={item}
                onToggleComplete={onToggleComplete}
                onToggleDoc={onToggleDoc}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* SECTION: COMPLETED */}
      {completedItems.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1 border-b border-border">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-700">
                Completed ({completedItems.length})
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {completedItems.map((item) => (
              <ActionCard
                key={item.id}
                item={item}
                onToggleComplete={onToggleComplete}
                onToggleDoc={onToggleDoc}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
