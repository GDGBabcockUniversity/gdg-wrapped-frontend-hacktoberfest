// components/StoryBar.tsx
import React from "react";

interface StoryBarProps {
  steps: number;
  currentPosition: number;
  onSegmentClick?: (step: number) => void;
  progressPercent?: number; // Progress percentage (0-100) for the active segment
}

const StoryBar: React.FC<StoryBarProps> = ({ 
  steps, 
  currentPosition, 
  onSegmentClick,
  progressPercent = 0 
}) => {
  const segments = [];
  for (let i = 0; i < steps; i++) {
    // Segments before current position are fully completed (white)
    const isCompleted = i < currentPosition;
    // Current segment is active and shows progress
    const isActive = i === currentPosition;
    const isClickable = onSegmentClick && i > 1; // Can't click on landing/error pages
    
    segments.push(
      <div
        key={i}
        onClick={() => isClickable && onSegmentClick(i + 1)}
        className={`relative flex-1 h-1 mx-0.5 rounded-full overflow-hidden ${
          isClickable ? "cursor-pointer" : ""
        }`}
        role={isClickable ? "button" : undefined}
        aria-label={isClickable ? `Go to step ${i + 1}` : undefined}
      >
        {/* Background (unfilled state) */}
        <div className="absolute inset-0 bg-white/30" />
        
        {/* Filled state */}
        <div 
          className={`absolute inset-0 transition-all ${
            isCompleted 
              ? "bg-white w-full" 
              : isActive 
                ? "bg-white" 
                : "w-0"
          }`}
          style={{
            width: isActive ? `${progressPercent}%` : undefined,
            transition: isActive ? 'width 0.016s linear' : 'width 0.3s ease'
          }}
        />
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full z-30 pt-4 px-4">
      <div className="flex justify-center items-center w-full gap-1">
        {segments}
      </div>
    </div>
  );
};

export default StoryBar;
