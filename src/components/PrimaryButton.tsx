import React from 'react';

// Define the component's props
type PrimaryButtonProps = {
  label: string;
  onClick: () => void;
  variant?: 'blue' | 'red'; // Optional prop for different colors
  disabled?: boolean;      // Optional prop for disabled state
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onClick,
  variant = 'blue', // Default to 'blue' if no variant is provided
  disabled = false,
}) => {
  // Determine button styles based on props
  const baseClasses = "md:w-1/3 h-12 cursor-pointer font-['Inter'] rounded w-full mt-2 md:mt-0";
  const variantClasses = {
    blue: 'bg-[#4286f5] hover:bg-blue-600',
    red: 'bg-red-500 hover:bg-red-600',
  };
  const disabledClasses = 'bg-gray-400 cursor-not-allowed';

  const buttonClass = `
    ${baseClasses}
    ${disabled ? disabledClasses : variantClasses[variant]}
  `;

  return (
    <button className={buttonClass.trim()} onClick={onClick} disabled={disabled}>
      <div className="text-center text-lg leading-[24px] text-white">
        {label}
      </div>
    </button>
  );
};

export default PrimaryButton;