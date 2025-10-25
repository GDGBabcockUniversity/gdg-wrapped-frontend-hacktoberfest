'use client';

import React, { forwardRef } from 'react';

export type InputVariant = 'default' | 'outline' | 'filled' | 'flushed';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputStatus = 'default' | 'error' | 'success' | 'warning';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  inputSize?: InputSize;
  status?: InputStatus;
  label?: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isRequired?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  inputSize = 'md',
  status = 'default',
  label,
  helperText,
  errorText,
  leftIcon,
  rightIcon,
  isRequired = false,
  isDisabled = false,
  isLoading = false,
  className = '',
  ...props
}, ref) => {
  const getVariantClasses = (variant: InputVariant, status: InputStatus): string => {
    const baseClasses = 'w-full transition-all duration-200 focus:outline-none focus:ring-2';
    
    switch (variant) {
      case 'outline':
        return `${baseClasses} border-2 bg-transparent ${
          status === 'error' 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
            : status === 'success'
            ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
            : status === 'warning'
            ? 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-200'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
        }`;
      case 'filled':
        return `${baseClasses} border-0 bg-gray-100 ${
          status === 'error' 
            ? 'focus:ring-red-200' 
            : status === 'success'
            ? 'focus:ring-green-200'
            : status === 'warning'
            ? 'focus:ring-yellow-200'
            : 'focus:ring-blue-200'
        }`;
      case 'flushed':
        return `${baseClasses} border-0 border-b-2 bg-transparent rounded-none ${
          status === 'error' 
            ? 'border-red-500 focus:border-red-500' 
            : status === 'success'
            ? 'border-green-500 focus:border-green-500'
            : status === 'warning'
            ? 'border-yellow-500 focus:border-yellow-500'
            : 'border-gray-300 focus:border-blue-500'
        }`;
      default:
        return `${baseClasses} border bg-white ${
          status === 'error' 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
            : status === 'success'
            ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
            : status === 'warning'
            ? 'border-yellow-500 focus:border-yellow-500 focus:ring-yellow-200'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
        }`;
    }
  };

  const getSizeClasses = (size: InputSize): string => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2 text-sm';
      case 'lg':
        return 'px-4 py-3 text-lg';
      default:
        return 'px-3 py-2.5 text-base';
    }
  };

  const getRoundedClasses = (variant: InputVariant): string => {
    return variant === 'flushed' ? '' : 'rounded-md';
  };

  const getStatusColor = (status: InputStatus): string => {
    switch (status) {
      case 'error':
        return 'text-red-600';
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const inputClasses = `
    ${getVariantClasses(variant, status)}
    ${getSizeClasses(inputSize)}
    ${getRoundedClasses(variant)}
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${isLoading ? 'opacity-50' : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {isRequired && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          disabled={isDisabled || isLoading}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
        
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
          </div>
        )}
      </div>
      
      {errorText && status === 'error' && (
        <p className={`mt-1 text-sm ${getStatusColor('error')}`}>
          {errorText}
        </p>
      )}
      
      {helperText && status !== 'error' && (
        <p className={`mt-1 text-sm ${getStatusColor(status)}`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
