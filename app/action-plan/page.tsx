'use client';

import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { ActionTimeline } from '@/components/actions/ActionTimeline';
import { AddActionModal } from '@/components/actions/AddActionModal';
import { Button } from '@/components/ui/Button';
import { actionService } from '@/services/actionService';
import { ActionPlanItem } from '@/types';
import { Plus, CheckSquare, Sparkles, Filter } from 'lucide-react';

export default function ActionPlanPage() {
  const [actions, setActions] = useState<ActionPlanItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    loadActions();
    actionService.loadFromCloud().then((cloudItems) => {
      setActions([...cloudItems]);
    });
  }, []);

  const loadActions = () => {
    const list = actionService.getActionPlan();
    setActions([...list]);
  };

  const handleToggleComplete = (id: string) => {
    const updated = actionService.toggleComplete(id);
    setActions([...updated]);
  };

  const handleToggleDoc = (id: string, docIndex: number) => {
    const updated = actionService.toggleDocument(id, docIndex);
    setActions([...updated]);
  };

  const handleDelete = (id: string) => {
    const updated = actionService.deleteItem(id);
    setActions([...updated]);
  };

  const handleAddCustom = (item: Omit<ActionPlanItem, 'id' | 'createdAt'>) => {
    actionService.addItem(item);
    loadActions();
  };

  const filteredActions =
    filterType === 'all'
      ? actions
      : actions.filter((a) => a.type === filterType);

  const completedCount = actions.filter((a) => a.status === 'COMPLETED').length;
  const totalCount = actions.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <AppLayout
      title="My Tasks"
      subtitle="Things you need to complete for your scholarships, exams, and admissions."
    >
      <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
        {/* Top Progress & Add Button Bar */}
        <div className="bg-surface rounded-2xl border border-border p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between pr-4">
              <span className="text-xs font-semibold text-slate-500">
                Task Progress
              </span>
              <span className="text-xs font-bold text-slate-900">
                {completedCount} of {totalCount} completed ({progressPercent}%)
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddModalOpen(true)}
              leftIcon={<Plus className="h-4 w-4" />}
            >
              Add Task
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar">
          <div className="flex items-center gap-1.5">
            {[
              { id: 'all', label: 'All Tasks' },
              { id: 'scholarship', label: 'Scholarships' },
              { id: 'exam', label: 'Exams' },
              { id: 'document', label: 'Documents' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                  filterType === tab.id
                    ? 'bg-slate-900 text-white font-semibold shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 hidden sm:inline">
            Ordered by urgency
          </span>
        </div>

        {/* Action Timeline List */}
        <ActionTimeline
          items={filteredActions}
          onToggleComplete={handleToggleComplete}
          onToggleDoc={handleToggleDoc}
          onDelete={handleDelete}
          onAddCustom={() => setIsAddModalOpen(true)}
        />

        {/* Add Modal */}
        <AddActionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddCustom}
        />
      </div>
    </AppLayout>
  );
}
