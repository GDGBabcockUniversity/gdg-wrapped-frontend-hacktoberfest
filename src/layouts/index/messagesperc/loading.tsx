import React, { useEffect, useState } from "react";

type LoadingMessagesProps = {
  style?: React.CSSProperties;
  isDone: boolean;
  setIsDone: (value: boolean) => void;
};

const LoadingMessages: React.FC<LoadingMessagesProps> = ({
  isDone: isDoneProp,
  setIsDone: setIsDoneProp,
  style,
}) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(isDoneProp);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = Math.min(oldProgress + 1, 100);
        if (newProgress === 100) {
          setIsDone(true);
          setIsDoneProp(true);
          clearInterval(interval);
        }
        return newProgress;
      });
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      id="ResourceCRoot"
      className="bg-black flex flex-row gap-10 w-full md:h-[1024px] items-start pt-16 md:px-[148px]"
    >
      <div className="flex flex-col justify-between gap-10 md:gap-32 w-full md:w-3/4 items-start">
        <img src="/logo.png" alt="GDSCBabcockUniversityHorizontalWhite" />
        <div className="flex flex-col ml-2 md:ml-12 gap-5 w-full font-sans items-start">
          <div className="relative flex flex-row justify-end w-full items-start pt-5 md:pt-16 md:px-16">
            <div className="text-5xl font-sans font-semibold text-[#34a853] w-full">
              Hey you!
              <br />
              <span className="text-white md:text-5xl text-xl">
                <br />
                Want to know how much buzz you were able to create in the
                community?
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
          <div className="flex flex-row justify-between w-full md:w-5/6 items-start">
            <div className="w-full border-solid border-[#e3e3e3] bg-[#f4f4f4] flex flex-row mt-8 md:w-1/2 h-8 items-start pt-1 px-3 border rounded-lg">
              <div
                className="bg-[#ea4235] w-2/5 h-5 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="relative flex flex-row w-3 items-start">
              <img
                src="/triangle.svg"
                alt="Vector1"
                className="w-3 h-6 absolute top-0 left-0"
              />
              <img
                src="/whitetriangle.svg"
                alt="Vector2"
                className="relative w-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessages;
