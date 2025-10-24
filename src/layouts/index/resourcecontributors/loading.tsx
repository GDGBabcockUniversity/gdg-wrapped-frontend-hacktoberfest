import React, { useEffect, useState } from "react";

type LoadingResourceProps = {
  style?: React.CSSProperties;
  isDone: boolean;
  setIsDone: (value: boolean) => void;
};
const LoadingResource: React.FC<LoadingResourceProps> = ({
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
      className="bg-black flex flex-row gap-10 w-full h-full md:h-[1024px] items-start pt-16 md:px-[148px]"
    >
      <div className="flex flex-col justify-between gap-6 md:gap-32 w-full md:w-3/4 items-start md:px-0 px-5">
        <img src="/logo.png" alt="GDSCBabcockUniversityHorizontalWhite"
          width={655}
          height={100}
          className="aspect-[6.62] object-contain object-center w-[655px] overflow-hidden max-w-full" />
        <div className="flex flex-col md:ml-12 gap-5 w-full font-sans items-start">
          <div className="relative flex flex-row justify-end w-full items-start pt-16 md:px-16">
            <div className="text-5xl font-semibold text-[#34a853] absolute top-0 left-0 h-[70px] md:h-[300px] w-full">
              Well done!
              <br />
              <span className="font-sans text-white md:text-5xl text-xl">
                <br />
                The next section is a measure of all the good stuff you have
                shared with the community so far.
              </span>
            </div>
            <img
              src="/warp.svg"
              alt="Vector"
              className="w-8 h-8 hidden md:absolute top-[210px] left-[715px]"
            />
            <img
              src="/greydot.svg"
              alt="Vector6"
              className="relative mb-56 w-3"
            />
          </div>
          <div className="flex flex-row justify-between w-full md:w-5/6 items-start">
            <div className="border-solid border-[#e3e3e3] bg-[#f4f4f4] flex flex-row mt-8 w-full md:w-1/2 h-8 items-start pt-1 px-3 border rounded-lg">
              <div
                className="bg-[#ea4235] w-2/5 h-5 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="relative md:flex flex-row w-3 items-start hidden">
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

export default LoadingResource;
