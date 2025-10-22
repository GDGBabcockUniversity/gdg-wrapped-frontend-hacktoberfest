import React from 'react';

// Define the component's props with enhanced types
export type ButtonVariant = 'blue' | 'red' | 'green' | 'yellow' | 'gradient' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  testId?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  variant = 'blue',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  ariaLabel,
  testId,
}) => {
  // Base styles
  const baseClasses = "cursor-pointer font-['Inter'] rounded transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center gap-2";
  
  // Size variations
  const sizeClasses = {
    small: 'h-8 px-3 text-sm',
    medium: 'h-12 px-4 text-lg',
    large: 'h-14 px-6 text-xl',
  };

  // Variant styles with GDSC branding
  const variantClasses = {
    blue: 'bg-[#4286f5] hover:bg-blue-600 text-white focus:ring-blue-500',
    red: 'bg-[#ea4335] hover:bg-red-600 text-white focus:ring-red-500',
    green: 'bg-[#34a853] hover:bg-green-600 text-white focus:ring-green-500',
    yellow: 'bg-[#fbbc05] hover:bg-yellow-500 text-gray-900 focus:ring-yellow-500',
    gradient: 'bg-gdsc-gradient hover:opacity-90 text-white focus:ring-blue-500',
    outline: 'border-2 border-[#4286f5] text-[#4286f5] hover:bg-[#4286f5] hover:text-white focus:ring-blue-500',
  };

  // Disabled styles
  const disabledClasses = 'bg-gray-400 cursor-not-allowed opacity-50';
  
  // Loading styles
  const loadingClasses = 'cursor-wait opacity-75';

  // Width classes
  const widthClasses = fullWidth ? 'w-full md:w-1/3' : 'w-auto';

  // Combine all classes
  const buttonClass = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${disabled || loading ? disabledClasses : variantClasses[variant]}
    ${loading ? loadingClasses : ''}
    ${widthClasses}
    ${className}
    mt-2 md:mt-0
  `.trim();

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  // Handle click with loading and disabled states
  const handleClick = () => {
    if (!disabled && !loading) {
      onClick();
    }
  };

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
      aria-label={ariaLabel || label}
      data-testid={testId}
    >
      {/* Left icon */}
      {icon && iconPosition === 'left' && !loading && (
        <span className="flex items-center">{icon}</span>
      )}
      
      {/* Loading spinner */}
      {loading && <LoadingSpinner />}
      
      {/* Button text */}
      <span className="font-medium leading-tight text-center">
        {loading ? 'Loading...' : label}
      </span>
      
      {/* Right icon */}
      {icon && iconPosition === 'right' && !loading && (
        <span className="flex items-center">{icon}</span>
      )}
    </button>
  );
};

export default PrimaryButton;