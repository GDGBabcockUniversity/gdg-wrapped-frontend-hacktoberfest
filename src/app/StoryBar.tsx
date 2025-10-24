// components/StoryBar.tsx
import React from "react";

interface StoryBarProps {
  steps: number;
  currentPosition: number;
  onSegmentClick?: (step: number) => void;
}

const StoryBar: React.FC<StoryBarProps> = ({ steps, currentPosition, onSegmentClick }) => {
  const segments = [];
  for (let i = 0; i < steps; i++) {
    // Segments up to and including the current position are active (white)
    const isActive = i <= currentPosition;
    const isClickable = onSegmentClick && i > 1; // Can't click on landing/error pages
    
    segments.push(
      <div
        key={i}
        onClick={() => isClickable && onSegmentClick(i + 1)}
        className={`flex-1 h-1 sm:h-2 ${
          isActive ? "bg-gdg-gradient" : "bg-white"
        } mx-0.5 ${isClickable ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
        role={isClickable ? "button" : undefined}
        aria-label={isClickable ? `Go to step ${i + 1}` : undefined}
      />
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full z-30">
      <div className="flex justify-center items-center w-full px-2 sm:px-4">
        {segments}
      </div>
    </div>
  );
};

export default StoryBar;
