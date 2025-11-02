import React from "react";

type LoadingMessagesImpactProps = {
  style?: React.CSSProperties;
  isDone: boolean;
  setIsDone: (value: boolean) => void;
};

const LoadingMessagesImpact: React.FC<LoadingMessagesImpactProps> = ({
  isDone: isDoneProp,
  setIsDone: setIsDoneProp,
  style,
}) => {
  return (
    <div
      id="ResourceCRoot"
      className="bg-black flex flex-row gap-10 w-full md:h-[1024px] items-start pt-16 md:px-[148px]"
    >
      <div className="flex flex-col justify-between gap-10 md:gap-32 w-full md:w-3/4 items-start">
        <img src="/logo.png" alt="GDGBabcockUniversityHorizontalWhite" />
        <div className="flex flex-col ml-2 md:ml-12 gap-5 w-full font-sans items-start">
          <div className="relative flex flex-row justify-end w-full items-start pt-5 md:pt-16 md:px-16">
            <div className="text-5xl font-sans font-semibold text-[#34a853] w-full">
              You’re unstoppable! <br />
              <span className="text-white md:text-5xl text-xl">
                <br />
                Stay glued to your screen to see the measurement of your overall
                impact in GDG on Campus Babcock.
              </span>
            </div>
            <img
              src="/warp.svg"
              alt="Vector"
              className="hidden w-8 h-8 md:absolute top-[210px] left-[715px]"
            />
            <img
              src="/greydot.svg"
              alt="Vector6"
              className="hidden md:relative mb-56 w-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessagesImpact;
