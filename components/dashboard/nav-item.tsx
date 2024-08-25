'use client';

import * as React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import useActiveLink from '@/hooks/useActiveLink';
import { cn } from '@/lib/utils'; // Utility for conditional class names

interface NavItemProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

export function NavItem({ href, label, children }: NavItemProps) {
  const activeClassName = 'bg-gray-100 text-black dark:text-white';
  const inactiveClassName = 'text-muted-foreground hover:text-black dark:hover:text-white';

  // Use the useActiveLink hook to get the appropriate class name
  const className = useActiveLink(href, activeClassName, inactiveClassName);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={href}
          className={cn(
            'flex items-center justify-center h-8 w-8 rounded-lg transition-colors',
            className
          )}
        >
          {children}
          <span className="sr-only">{label}</span>
        </a>
      </TooltipTrigger>
      <TooltipContent side="right" className='bg-white text-black dark:text-white'>{label}</TooltipContent>
    </Tooltip>
  );
}
