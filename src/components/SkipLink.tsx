'use client';

import React from 'react';

export interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * SkipLink component provides keyboard navigation shortcuts for accessibility
 * Allows users to skip to main content or specific sections
 */
export const SkipLink: React.FC<SkipLinkProps> = ({
  href,
  children,
  className = '',
}) => {
  return (
    <a
      href={href}
      className={`
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
        bg-blue-600 text-white px-4 py-2 rounded-md z-50 
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </a>
  );
};

export default SkipLink;
