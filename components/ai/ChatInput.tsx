import React, { useState, useRef } from 'react';
import { Send, Paperclip, Mic, ArrowUp } from 'lucide-react';
import { Button } from '../ui/Button';

export interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onAttachFile?: (file: File) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onAttachFile,
  isLoading = false,
  placeholder = 'Ask Notice2Action anything (e.g. scholarships for B.Tech, GUJCET 2027 dates)...',
}) => {
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAttachFile) {
      onAttachFile(file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-2xl border border-border bg-white shadow-float p-2 sm:p-2.5 transition-all focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        className="hidden"
      />

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={2}
        className="w-full resize-none border-0 bg-transparent px-3 py-1.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0 leading-relaxed"
      />

      <div className="flex items-center justify-between pt-1 border-t border-slate-100 px-1">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-lg p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Attach Government Notification PDF"
          >
            <Paperclip className="h-4 w-4" />
          </button>

          <button
            type="button"
            disabled
            className="rounded-lg p-2 text-slate-300 cursor-not-allowed transition-colors"
            title="Voice input (Available in Step 2)"
          >
            <Mic className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Press <kbd className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">Enter ↵</kbd>
          </span>
          <Button
            type="submit"
            size="sm"
            variant="primary"
            disabled={!input.trim() || isLoading}
            isLoading={isLoading}
            className="h-8 w-8 p-0 rounded-lg sm:h-auto sm:w-auto sm:px-3 sm:py-1.5"
          >
            <span className="hidden sm:inline">Send</span>
            <ArrowUp className="h-4 w-4 sm:hidden" />
          </Button>
        </div>
      </div>
    </form>
  );
};
