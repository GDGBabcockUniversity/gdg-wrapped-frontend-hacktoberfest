'use client';

import React from 'react';

export type BadgeVariant = 'solid' | 'outline' | 'subtle' | 'ghost';
export type BadgeColorScheme = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink' | 'gray' | 'gdsc';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  colorScheme?: BadgeColorScheme;
  size?: BadgeSize;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'solid',
  colorScheme = 'blue',
  size = 'md',
  className = '',
}) => {
  const getSizeClasses = (size: BadgeSize): string => {
    switch (size) {
      case 'sm':
        return 'px-2 py-0.5 text-xs';
      case 'lg':
        return 'px-3 py-1.5 text-sm';
      default:
        return 'px-2.5 py-1 text-xs';
    }
  };

  const getVariantClasses = (variant: BadgeVariant, colorScheme: BadgeColorScheme): string => {
    const colorMap = {
      blue: {
        solid: 'bg-blue-500 text-white',
        outline: 'border border-blue-500 text-blue-500 bg-transparent',
        subtle: 'bg-blue-100 text-blue-800',
        ghost: 'text-blue-500 bg-transparent',
      },
      green: {
        solid: 'bg-green-500 text-white',
        outline: 'border border-green-500 text-green-500 bg-transparent',
        subtle: 'bg-green-100 text-green-800',
        ghost: 'text-green-500 bg-transparent',
      },
      red: {
        solid: 'bg-red-500 text-white',
        outline: 'border border-red-500 text-red-500 bg-transparent',
        subtle: 'bg-red-100 text-red-800',
        ghost: 'text-red-500 bg-transparent',
      },
      yellow: {
        solid: 'bg-yellow-500 text-white',
        outline: 'border border-yellow-500 text-yellow-500 bg-transparent',
        subtle: 'bg-yellow-100 text-yellow-800',
        ghost: 'text-yellow-500 bg-transparent',
      },
      purple: {
        solid: 'bg-purple-500 text-white',
        outline: 'border border-purple-500 text-purple-500 bg-transparent',
        subtle: 'bg-purple-100 text-purple-800',
        ghost: 'text-purple-500 bg-transparent',
      },
      pink: {
        solid: 'bg-pink-500 text-white',
        outline: 'border border-pink-500 text-pink-500 bg-transparent',
        subtle: 'bg-pink-100 text-pink-800',
        ghost: 'text-pink-500 bg-transparent',
      },
      gray: {
        solid: 'bg-gray-500 text-white',
        outline: 'border border-gray-500 text-gray-500 bg-transparent',
        subtle: 'bg-gray-100 text-gray-800',
        ghost: 'text-gray-500 bg-transparent',
      },
      gdsc: {
        solid: 'bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500 text-white',
        outline: 'border-2 border-transparent bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500 bg-clip-border text-transparent bg-clip-text',
        subtle: 'bg-gradient-to-r from-blue-100 via-red-100 via-yellow-100 to-green-100 text-gray-800',
        ghost: 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500',
      },
    };

    return colorMap[colorScheme]?.[variant] || colorMap.blue.solid;
  };

  const badgeClasses = `
    inline-flex items-center justify-center font-medium rounded-full
    ${getSizeClasses(size)}
    ${getVariantClasses(variant, colorScheme)}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <span className={badgeClasses}>
      {children}
    </span>
  );
};

export default Badge;
