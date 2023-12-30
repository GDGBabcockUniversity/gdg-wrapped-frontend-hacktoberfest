import React, { useEffect, useState } from "react";
import Image from "next/image";

type sitTightProps = {
  style?: React.CSSProperties;
  isDone: boolean;
  setIsDone: (value: boolean) => void;
};
const SitTight: React.FC<sitTightProps> = ({
  style,
  isDone: isDoneProp,
  setIsDone: setIsDoneProp,
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
      className="bg-black flex flex-col justify-center items-center px-16 py-12 max-md:px-5 scale-100 opacity-100 transform transition-all duration-1000 ease-in-out"
      style={style}
    >
      <div className="flex w-full max-w-[1176px] items-stretch gap-1.5 mt-4 mb-56 max-md:max-w-full max-md:flex-wrap max-md:mb-10">
        <div className="flex grow basis-[0%] flex-col items-start max-md:max-w-full">
          <Image
            src="/logo.png"
            alt="GDS Logo"
            width={655}
            height={100}
            className="aspect-[6.62] object-contain object-center w-[655px] overflow-hidden max-w-full"
          />

          <div className="self-center w-full max-w-[1101px] max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[62%] max-md:w-full max-md:ml-0">
                <div className="flex flex-col items-stretch my-auto max-md:max-w-full max-md:mt-10">
                  <div className="text-white text-5xl font-semibold max-md:max-w-full max-md:text-4xl">
                    <span className="text-red-500">Omo Ologo!</span> <br />
                    <br />
                    <br />
                    Welcome to the review of your GDSC activity.
                  </div>
                  <div className="border bg-zinc-100 flex flex-col justify-center items-stretch mt-16 py-2 rounded-xl border-solid border-neutral-200 max-md:max-w-full max-md:mt-10">
                    <div
                      className="bg-green-600 flex shrink-0 h-5 flex-col rounded-md max-md:max-w-full"
                      style={{ width: `${progress}%` }} // Control the width of the progress bar
                    />
                  </div>
                </div>
              </div>
              <div className="hidden md:flex flex-col items-stretch w-[38%] ml-5 max-md:w-full max-md:ml-0">
                <Image
                  src="/woman.svg"
                  alt="Woman"
                  width={500}
                  height={500}
                  className="aspect-[0.93] object-contain object-center w-full overflow-hidden grow mt-56 max-md:mt-10 pl-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitTight;
