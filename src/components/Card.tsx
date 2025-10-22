import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
  padding?: 'none' | 'small' | 'medium' | 'large';
  rounded?: 'none' | 'small' | 'medium' | 'large' | 'full';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  onClick?: () => void;
  hover?: boolean;
  testId?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'medium',
  padding = 'medium',
  rounded = 'medium',
  shadow = 'medium',
  onClick,
  hover = false,
  testId,
}) => {
  // Base styles
  const baseClasses = "bg-white transition-all duration-200 ease-in-out";

  // Variant styles
  const variantClasses = {
    default: 'border border-gray-200',
    elevated: 'border-0',
    outlined: 'border-2 border-gray-300',
    filled: 'bg-gray-50 border border-gray-200',
  };

  // Size styles
  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg',
  };

  // Padding styles
  const paddingClasses = {
    none: 'p-0',
    small: 'p-3',
    medium: 'p-4',
    large: 'p-6',
  };

  // Rounded styles
  const roundedClasses = {
    none: 'rounded-none',
    small: 'rounded-sm',
    medium: 'rounded-lg',
    large: 'rounded-xl',
    full: 'rounded-full',
  };

  // Shadow styles
  const shadowClasses = {
    none: 'shadow-none',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg',
  };

  // Hover styles
  const hoverClasses = hover ? 'hover:shadow-lg hover:scale-105 hover:-translate-y-1' : '';

  // Interactive styles
  const interactiveClasses = onClick ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' : '';

  // Combine all classes
  const cardClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${paddingClasses[padding]}
    ${roundedClasses[rounded]}
    ${shadowClasses[shadow]}
    ${hoverClasses}
    ${interactiveClasses}
    ${className}
  `.trim();

  const CardComponent = onClick ? 'button' : 'div';

  return (
    <CardComponent
      className={cardClasses}
      onClick={onClick}
      data-testid={testId}
    >
      {children}
    </CardComponent>
  );
};

export default Card;
