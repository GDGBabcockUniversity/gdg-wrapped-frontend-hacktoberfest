/**
 * Performance optimization utilities for the GDG Wrapped Frontend
 */

import { useCallback, useMemo, useRef, useEffect } from 'react';

/**
 * Custom hook for debouncing values
 * Useful for search inputs, API calls, and other expensive operations
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Custom hook for throttling function calls
 * Useful for scroll events, resize events, and other high-frequency events
 */
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const throttleRef = useRef<boolean>(false);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (!throttleRef.current) {
        callback(...args);
        throttleRef.current = true;
        setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    }) as T,
    [callback, delay]
  );
};

/**
 * Custom hook for intersection observer
 * Useful for lazy loading, infinite scroll, and visibility tracking
 */
export const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
): [React.RefCallback<Element>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  const callbackRef = useCallback((el: Element | null) => {
    setElement(el);
  }, []);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      options
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element, options]);

  return [callbackRef, isIntersecting];
};

/**
 * Custom hook for lazy loading images
 * Improves page load performance by loading images only when needed
 */
export const useLazyImage = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [imageRef, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  useEffect(() => {
    if (isIntersecting && src) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
      };
      img.src = src;
    }
  }, [isIntersecting, src]);

  return { imageSrc, imageRef };
};

/**
 * Custom hook for prefetching resources
 * Improves navigation performance by preloading critical resources
 */
export const usePrefetch = (urls: string[], type: 'script' | 'style' | 'image' = 'script') => {
  useEffect(() => {
    const prefetchedElements: HTMLElement[] = [];

    urls.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      
      switch (type) {
        case 'script':
          link.as = 'script';
          break;
        case 'style':
          link.as = 'style';
          break;
        case 'image':
          link.as = 'image';
          break;
      }

      document.head.appendChild(link);
      prefetchedElements.push(link);
    });

    return () => {
      prefetchedElements.forEach((element) => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, [urls, type]);
};

/**
 * Custom hook for memoizing expensive calculations
 * Prevents unnecessary recalculations on re-renders
 */
export const useExpensiveCalculation = <T>(
  calculate: () => T,
  dependencies: React.DependencyList
): T => {
  return useMemo(calculate, dependencies);
};

/**
 * Custom hook for optimized event listeners
 * Automatically handles cleanup and prevents memory leaks
 */
export const useEventListener = <T extends keyof WindowEventMap>(
  eventType: T,
  handler: (event: WindowEventMap[T]) => void,
  element: Window | Element = window,
  options?: AddEventListenerOptions
) => {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: WindowEventMap[T]) => savedHandler.current(event);

    element.addEventListener(eventType, eventListener as EventListener, options);

    return () => {
      element.removeEventListener(eventType, eventListener as EventListener, options);
    };
  }, [eventType, element, options]);
};

/**
 * Custom hook for measuring component performance
 * Helps identify performance bottlenecks
 */
export const usePerformanceMonitor = (componentName: string) => {
  const renderStartTime = useRef<number>(0);

  useEffect(() => {
    renderStartTime.current = performance.now();
  });

  useEffect(() => {
    const renderTime = performance.now() - renderStartTime.current;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
    }

    // Send to performance monitoring service in production
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.performance.mark(`${componentName}-render-end`);
    }
  });

  return {
    startMeasure: (measureName: string) => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        window.performance.mark(`${measureName}-start`);
      }
    },
    endMeasure: (measureName: string) => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        window.performance.mark(`${measureName}-end`);
        window.performance.measure(
          measureName,
          `${measureName}-start`,
          `${measureName}-end`
        );
      }
    },
  };
};

/**
 * Image optimization utilities
 */
export const ImageUtils = {
  /**
   * Generates optimized image URLs for different screen sizes
   */
  generateSrcSet: (baseUrl: string, sizes: number[]): string => {
    return sizes
      .map((size) => `${baseUrl}?w=${size} ${size}w`)
      .join(', ');
  },

  /**
   * Generates sizes attribute for responsive images
   */
  generateSizes: (breakpoints: { maxWidth: string; size: string }[]): string => {
    return breakpoints
      .map(({ maxWidth, size }) => `(max-width: ${maxWidth}) ${size}`)
      .join(', ');
  },

  /**
   * Preloads critical images
   */
  preloadImage: (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  },
};

/**
 * Bundle splitting utilities for code splitting
 */
export const BundleUtils = {
  /**
   * Dynamic import with retry logic
   */
  importWithRetry: async <T>(
    importFn: () => Promise<T>,
    retries: number = 3,
    delay: number = 1000
  ): Promise<T> => {
    try {
      return await importFn();
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        return BundleUtils.importWithRetry(importFn, retries - 1, delay);
      }
      throw error;
    }
  },

  /**
   * Preload a module for faster subsequent imports
   */
  preloadModule: (moduleUrl: string): void => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = moduleUrl;
    document.head.appendChild(link);
  },
};

/**
 * Memory optimization utilities
 */
export const MemoryUtils = {
  /**
   * Weak map for storing component instances to prevent memory leaks
   */
  componentCache: new WeakMap(),

  /**
   * Cleanup function for component unmounting
   */
  cleanup: (element: Element): void => {
    // Remove event listeners
    const events = ['click', 'scroll', 'resize', 'load'];
    events.forEach((event) => {
      element.removeEventListener(event, () => {});
    });

    // Clear any intervals or timeouts
    // This should be done in component cleanup
  },

  /**
   * Check memory usage (development only)
   */
  checkMemoryUsage: (): void => {
    if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
      const memInfo = (performance as any).memory;
      console.log('Memory Usage:', {
        used: `${(memInfo.usedJSHeapSize / 1048576).toFixed(2)} MB`,
        total: `${(memInfo.totalJSHeapSize / 1048576).toFixed(2)} MB`,
        limit: `${(memInfo.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
      });
    }
  },
};

/**
 * Network optimization utilities
 */
export const NetworkUtils = {
  /**
   * Check network connection quality
   */
  getConnectionQuality: (): 'slow' | 'good' | 'fast' => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection.effectiveType === '4g') return 'fast';
      if (connection.effectiveType === '3g') return 'good';
      return 'slow';
    }
    return 'good'; // Default assumption
  },

  /**
   * Adaptive loading based on network conditions
   */
  shouldLoadHighQuality: (): boolean => {
    const quality = NetworkUtils.getConnectionQuality();
    const saveData = 'connection' in navigator && (navigator as any).connection.saveData;
    
    return quality === 'fast' && !saveData;
  },

  /**
   * Preconnect to external domains
   */
  preconnect: (domains: string[]): void => {
    domains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      document.head.appendChild(link);
    });
  },
};

// Import useState at the top
import { useState } from 'react';
