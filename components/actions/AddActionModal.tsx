import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { ActionPlanItem } from '@/types';

export interface AddActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<ActionPlanItem, 'id' | 'createdAt'>) => void;
}

export const AddActionModal: React.FC<AddActionModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'HIGH' | 'MEDIUM' | 'LOW'>('HIGH');
  const [categoryTimeframe, setCategoryTimeframe] = useState<'TODAY' | 'UPCOMING'>('TODAY');
  const [docList, setDocList] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const docs = docList
      .split('\n')
      .map((d) => d.trim())
      .filter(Boolean)
      .map((name) => ({ name, checked: false }));

    onAdd({
      title: title.trim(),
      type: 'general',
      deadline: deadline.trim() || 'Upcoming',
      priority,
      status: 'PENDING',
      categoryTimeframe,
      documents: docs,
      notes: notes.trim(),
    });

    // Reset
    setTitle('');
    setDeadline('');
    setDocList('');
    setNotes('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Custom Action Item"
      subtitle="Track documents, offline visit deadlines, or portal application steps"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Action Title *"
          placeholder="e.g. Visit Mamlatdar Office for Income Certificate"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Target Date / Deadline"
            placeholder="e.g. 20 Oct 2026"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            options={[
              { value: 'HIGH', label: 'High Priority (Urgent Cutoff)' },
              { value: 'MEDIUM', label: 'Medium Priority' },
              { value: 'LOW', label: 'Low Priority (Watchlist)' },
            ]}
          />
        </div>

        <Select
          label="Timeframe Section"
          value={categoryTimeframe}
          onChange={(e) => setCategoryTimeframe(e.target.value as any)}
          options={[
            { value: 'TODAY', label: 'Today / Immediate Cutoffs' },
            { value: 'UPCOMING', label: 'Upcoming Horizon' },
          ]}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
            Required Documents (One per line)
          </label>
          <textarea
            rows={3}
            value={docList}
            onChange={(e) => setDocList(e.target.value)}
            placeholder="Ration Card&#10;Affidavit / Stamp Paper&#10;Salary Slip"
            className="w-full rounded-lg border border-slate-200 px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>

        <Input
          label="Internal Notes"
          placeholder="Optional notes or instructions..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Save Action
          </Button>
        </div>
      </form>
    </Modal>
  );
};
