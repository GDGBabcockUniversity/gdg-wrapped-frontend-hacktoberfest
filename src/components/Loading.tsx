import React from 'react';

export type LoadingSize = 'sm' | 'md' | 'lg' | 'xl';
export type LoadingVariant = 'spinner' | 'dots' | 'pulse' | 'skeleton';
export type LoadingColor = 'primary' | 'secondary' | 'gdsc';

export interface LoadingProps {
  size?: LoadingSize;
  variant?: LoadingVariant;
  color?: LoadingColor;
  text?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  color = 'primary',
  text,
  className = '',
}) => {
  const getSizeClass = (size: LoadingSize): string => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-6 h-6';
      case 'lg': return 'w-8 h-8';
      case 'xl': return 'w-12 h-12';
      default: return 'w-6 h-6';
    }
  };

  const getColorClass = (color: LoadingColor): string => {
    switch (color) {
      case 'primary': return 'text-blue-600';
      case 'secondary': return 'text-gray-600';
      case 'gdsc': return 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500';
      default: return 'text-blue-600';
    }
  };

  const getDotSize = (size: LoadingSize): string => {
    switch (size) {
      case 'sm': return 'w-1 h-1';
      case 'md': return 'w-2 h-2';
      case 'lg': return 'w-3 h-3';
      case 'xl': return 'w-4 h-4';
      default: return 'w-2 h-2';
    }
  };

  const getSpinner = () => (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-current ${getSizeClass(size)} ${getColorClass(color)}`} />
  );

  const getDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`rounded-full bg-current ${getDotSize(size)} ${getColorClass(color)} animate-pulse`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );

  const getPulse = () => (
    <div className={`rounded-full bg-current ${getSizeClass(size)} ${getColorClass(color)} animate-pulse`} />
  );

  const getSkeleton = () => (
    <div className="animate-pulse space-y-2">
      <div className="bg-gray-300 rounded h-4 w-3/4"></div>
      <div className="bg-gray-300 rounded h-4 w-1/2"></div>
      <div className="bg-gray-300 rounded h-4 w-5/6"></div>
    </div>
  );

  const renderLoading = () => {
    switch (variant) {
      case 'dots':
        return getDots();
      case 'pulse':
        return getPulse();
      case 'skeleton':
        return getSkeleton();
      default:
        return getSpinner();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      {renderLoading()}
      {text && (
        <p className={`text-sm ${getColorClass(color)} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;
