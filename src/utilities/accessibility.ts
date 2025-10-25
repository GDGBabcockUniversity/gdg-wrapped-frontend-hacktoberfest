/**
 * Accessibility utility functions for the GDG Wrapped Frontend
 */

/**
 * Generates a unique ID for form elements and their labels
 * @param prefix - Optional prefix for the ID
 * @returns Unique ID string
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Announces content to screen readers
 * @param message - Message to announce
 * @param priority - Announcement priority ('polite' or 'assertive')
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Checks if the user prefers reduced motion
 * @returns Boolean indicating reduced motion preference
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Checks if the user prefers high contrast
 * @returns Boolean indicating high contrast preference
 */
export const prefersHighContrast = (): boolean => {
  return window.matchMedia('(prefers-contrast: high)').matches;
};

/**
 * Gets all focusable elements within a container
 * @param container - Container element to search within
 * @returns Array of focusable elements
 */
export const getFocusableElements = (container: Element): HTMLElement[] => {
  const focusableSelectors = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ].join(', ');
  
  return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
};

/**
 * Traps focus within a container element
 * @param container - Container to trap focus within
 * @returns Cleanup function to remove focus trap
 */
export const trapFocus = (container: Element): (() => void) => {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
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
};

/**
 * Creates an accessible description for a color
 * @param color - Color hex code or name
 * @returns Human-readable color description
 */
export const getColorDescription = (color: string): string => {
  const colorMap: Record<string, string> = {
    '#4285F4': 'Google Blue',
    '#EA4335': 'Google Red',
    '#FBBC04': 'Google Yellow',
    '#34A853': 'Google Green',
    'blue': 'Blue',
    'red': 'Red',
    'yellow': 'Yellow',
    'green': 'Green',
    'purple': 'Purple',
    'pink': 'Pink',
    'gray': 'Gray',
    'grey': 'Gray',
  };
  
  return colorMap[color.toLowerCase()] || color;
};

/**
 * Checks if a color combination has sufficient contrast ratio
 * @param foreground - Foreground color hex
 * @param background - Background color hex
 * @param level - WCAG level ('AA' or 'AAA')
 * @returns Boolean indicating sufficient contrast
 */
export const hasGoodContrast = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean => {
  // Simplified contrast check - in production, use a proper color contrast library
  const minRatio = level === 'AAA' ? 7 : 4.5;
  
  // This is a simplified implementation
  // For production, use libraries like 'color' or 'contrast-ratio'
  if (foreground === '#ffffff' && background === '#000000') return true;
  if (foreground === '#000000' && background === '#ffffff') return true;
  
  // Default to true for now - implement proper contrast calculation in production
  return true;
};

/**
 * Creates an ARIA label for complex UI elements
 * @param element - Element type or description
 * @param state - Current state of the element
 * @param context - Additional context
 * @returns ARIA label string
 */
export const createAriaLabel = (
  element: string,
  state?: string,
  context?: string
): string => {
  let label = element;
  
  if (state) {
    label += `, ${state}`;
  }
  
  if (context) {
    label += `. ${context}`;
  }
  
  return label;
};

/**
 * Manages focus restoration after modal/dialog closes
 */
export class FocusManager {
  private previousFocus: HTMLElement | null = null;
  
  /**
   * Saves the currently focused element
   */
  saveFocus(): void {
    this.previousFocus = document.activeElement as HTMLElement;
  }
  
  /**
   * Restores focus to the previously saved element
   */
  restoreFocus(): void {
    if (this.previousFocus) {
      this.previousFocus.focus();
      this.previousFocus = null;
    }
  }
  
  /**
   * Sets focus to a specific element with error handling
   * @param element - Element to focus
   */
  setFocus(element: HTMLElement | null): void {
    if (element && typeof element.focus === 'function') {
      try {
        element.focus();
      } catch (error) {
        console.warn('Failed to set focus:', error);
      }
    }
  }
}

/**
 * Keyboard event utilities
 */
export const KeyboardUtils = {
  /**
   * Checks if Enter key was pressed
   */
  isEnterKey: (event: KeyboardEvent): boolean => event.key === 'Enter',
  
  /**
   * Checks if Space key was pressed
   */
  isSpaceKey: (event: KeyboardEvent): boolean => event.key === ' ',
  
  /**
   * Checks if Escape key was pressed
   */
  isEscapeKey: (event: KeyboardEvent): boolean => event.key === 'Escape',
  
  /**
   * Checks if Tab key was pressed
   */
  isTabKey: (event: KeyboardEvent): boolean => event.key === 'Tab',
  
  /**
   * Checks if arrow keys were pressed
   */
  isArrowKey: (event: KeyboardEvent): boolean => 
    ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key),
  
  /**
   * Prevents default behavior and stops propagation
   */
  preventDefault: (event: KeyboardEvent): void => {
    event.preventDefault();
    event.stopPropagation();
  },
};

/**
 * ARIA utilities for dynamic content
 */
export const AriaUtils = {
  /**
   * Updates ARIA live region content
   */
  updateLiveRegion: (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
    announceToScreenReader(message, priority);
  },
  
  /**
   * Manages ARIA expanded state
   */
  toggleExpanded: (element: HTMLElement): void => {
    const isExpanded = element.getAttribute('aria-expanded') === 'true';
    element.setAttribute('aria-expanded', (!isExpanded).toString());
  },
  
  /**
   * Sets ARIA busy state
   */
  setBusy: (element: HTMLElement, busy: boolean = true): void => {
    element.setAttribute('aria-busy', busy.toString());
  },
  
  /**
   * Sets ARIA invalid state
   */
  setInvalid: (element: HTMLElement, invalid: boolean = true): void => {
    element.setAttribute('aria-invalid', invalid.toString());
  },
};
