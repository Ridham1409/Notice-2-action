import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export interface PDFUploaderProps {
  onFileUpload: (file: File) => void;
  isProcessing?: boolean;
}

export const PDFUploader: React.FC<PDFUploaderProps> = ({
  onFileUpload,
  isProcessing = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragover' || e.type === 'dragenter') {
      setIsDragOver(true);
    } else if (e.type === 'dragleave') {
      setIsDragOver(false);
    }
  };

  const processFile = (file: File) => {
    setError(null);
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setError('Please upload a PDF document (*.pdf).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds the 10 MB limit.');
      return;
    }
    onFileUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full space-y-3">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center p-8 sm:p-10 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer ${
          isDragOver
            ? 'border-primary-500 bg-primary-50/60 scale-[1.005]'
            : 'border-slate-300 hover:border-slate-400 bg-white/70'
        } ${isProcessing ? 'pointer-events-none opacity-75' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 mb-4 ring-8 ring-primary-50/50">
          <UploadCloud className="h-7 w-7 stroke-[1.75]" />
        </div>

        <div className="text-center space-y-1">
          <p className="text-base font-semibold text-slate-900">
            Drop your government notice PDF here
          </p>
          <p className="text-xs text-slate-500">
            or <span className="font-semibold text-primary-600 underline">choose a file</span> from your computer
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <FileText className="h-3.5 w-3.5 text-slate-400" />
            Supported: <strong>PDF</strong>
          </span>
          <span>•</span>
          <span>Maximum file size: <strong>10 MB</strong></span>
        </div>

        {isProcessing && (
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary-600 animate-pulse">
            <div className="h-2 w-2 rounded-full bg-primary-600" />
            <span>Scanning government circular text and dates...</span>
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
