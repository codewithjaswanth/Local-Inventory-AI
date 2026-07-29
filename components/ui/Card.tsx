'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = true,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-white dark:bg-[#091122]/95 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 shadow-md dark:shadow-2xl backdrop-blur-md transition-all duration-300',
          hoverable && 'hover:shadow-xl hover:border-emerald-500/40 dark:hover:border-emerald-500/50 hover:bg-slate-50/80 dark:hover:bg-[#0D172E]',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
