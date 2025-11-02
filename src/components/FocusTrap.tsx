'use client';

import React from 'react';

export interface FocusTrapProps {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

/**
 * FocusTrap component manages focus within a container for accessibility
 * Useful for modals, dropdowns, and other overlay components
 */
export const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  isActive = true,
  className = '',
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default FocusTrap;
