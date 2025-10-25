'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  quality?: number;
  priority?: boolean;
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedImage component with lazy loading, WebP support, and responsive images
 * Automatically optimizes images for better performance
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  quality = 80,
  priority = false,
  sizes,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, isInView]);

  // Generate optimized image URLs
  const generateOptimizedSrc = (originalSrc: string, format?: 'webp' | 'avif') => {
    // This would typically integrate with a CDN or image optimization service
    // For now, return the original src with quality parameter
    const url = new URL(originalSrc, window.location.origin);
    url.searchParams.set('q', quality.toString());
    if (width) url.searchParams.set('w', width.toString());
    if (height) url.searchParams.set('h', height.toString());
    if (format) url.searchParams.set('f', format);
    return url.toString();
  };

  // Generate srcSet for responsive images
  const generateSrcSet = () => {
    if (!width) return undefined;
    
    const breakpoints = [0.5, 1, 1.5, 2];
    return breakpoints
      .map((multiplier) => {
        const scaledWidth = Math.round(width * multiplier);
        const scaledSrc = generateOptimizedSrc(src);
        const url = new URL(scaledSrc);
        url.searchParams.set('w', scaledWidth.toString());
        return `${url.toString()} ${scaledWidth}w`;
      })
      .join(', ');
  };

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Check WebP support
  const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
  };

  // Get the best supported format
  const getBestFormat = () => {
    // Check for AVIF support first, then WebP, then original
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    if (canvas.toDataURL('image/avif').startsWith('data:image/avif')) {
      return 'avif';
    } else if (supportsWebP()) {
      return 'webp';
    }
    return undefined;
  };

  // Only render image if it's in view or priority
  if (!isInView && !priority) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 ${className}`}
        style={{ width, height }}
        aria-label={`Loading ${alt}`}
      >
        {placeholder && (
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-gray-400 text-sm">Loading...</span>
          </div>
        )}
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <span className="text-gray-400 text-sm">Image failed to load</span>
      </div>
    );
  }

  const optimizedSrc = generateOptimizedSrc(src, getBestFormat());
  const srcSet = generateSrcSet();

  return (
    <div className={`relative ${className}`}>
      {/* Placeholder/blur effect */}
      {placeholder && !isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{
            backgroundImage: `url(${placeholder})`,
          }}
        />
      )}
      
      {/* Main image with multiple format support */}
      <picture>
        {/* AVIF format for modern browsers */}
        <source
          srcSet={generateOptimizedSrc(src, 'avif')}
          type="image/avif"
          sizes={sizes}
        />
        
        {/* WebP format for most browsers */}
        <source
          srcSet={generateOptimizedSrc(src, 'webp')}
          type="image/webp"
          sizes={sizes}
        />
        
        {/* Fallback to original format */}
        <img
          ref={imgRef}
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </picture>
    </div>
  );
};

export default OptimizedImage;
