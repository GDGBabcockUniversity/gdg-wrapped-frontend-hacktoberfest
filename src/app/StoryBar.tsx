// components/StoryBar.tsx
import React from "react";

interface StoryBarProps {
  steps: number;
  currentPosition: number;
}

const StoryBar: React.FC<StoryBarProps> = ({ steps, currentPosition }) => {
  const segments = [];
  for (let i = 0; i < steps; i++) {
    // Segments up to and including the current position are active (white)
    const isActive = i <= currentPosition;
    segments.push(
      <div
        key={i}
        className={`flex-1 h-1 sm:h-2 ${
          isActive ? "bg-gdsc-gradient" : "bg-white"
        } mx-0.5`}
      />
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full z-10">
      <div className="flex justify-center items-center w-full px-2 sm:px-4">
        {segments}
      </div>
    </div>
  );
};

export default StoryBar;
