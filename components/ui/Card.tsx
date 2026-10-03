import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  padding = 'md',
  ...props
}) => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'bg-surface rounded-xl border border-border transition-all duration-200 shadow-card',
          hoverEffect &&
            'hover:shadow-cardHover hover:border-slate-300 hover:-translate-y-0.5 cursor-pointer',
          paddings[padding],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
