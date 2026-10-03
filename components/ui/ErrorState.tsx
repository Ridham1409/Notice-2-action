import React from 'react';
import { AlertCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  onBack?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'We could not load this information. Official source verification may be momentarily unavailable.',
  onRetry,
  onBack,
  className = '',
}) => {
  return (
    <div
      className={`rounded-2xl border border-red-200 bg-red-50/60 p-6 sm:p-8 text-center flex flex-col items-center justify-center ${className}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 mb-3 ring-8 ring-red-50">
        <AlertCircle className="h-6 w-6 stroke-[2]" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
        {message}
      </p>
      <div className="mt-5 flex items-center gap-3">
        {onRetry && (
          <Button
            variant="primary"
            size="sm"
            onClick={onRetry}
            leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
          >
            Try Again
          </Button>
        )}
        {onBack && (
          <Button
            variant="outline"
            size="sm"
            onClick={onBack}
            leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}
          >
            Go Back
          </Button>
        )}
      </div>
    </div>
  );
};
