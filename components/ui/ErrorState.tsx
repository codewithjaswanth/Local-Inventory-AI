'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred while loading this section. Please try again.',
  onRetry,
}) => {
  return (
    <div
      role="alert"
      className="bg-rose-50 dark:bg-rose-950/40 rounded-3xl p-8 text-center border border-rose-200 dark:border-rose-900/60 space-y-4 max-w-md mx-auto my-6"
    >
      <div className="w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-rose-900 dark:text-rose-200">{title}</h3>
      <p className="text-rose-700 dark:text-rose-300 text-xs sm:text-sm">{message}</p>
      {onRetry && (
        <div className="pt-2">
          <Button onClick={onRetry} variant="danger" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
            Retry Loading
          </Button>
        </div>
      )}
    </div>
  );
};
