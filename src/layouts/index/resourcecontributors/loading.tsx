import React from "react";

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
  return (
    <div
      id="ResourceCRoot"
      className="bg-black flex flex-row gap-10 w-full h-full md:h-[1024px] items-start pt-16 md:px-[148px]"
    >
      <div className="flex flex-col justify-between gap-6 md:gap-32 w-full md:w-3/4 items-start md:px-0 px-5">
        <img src="/logo.png" alt="GDGBabcockUniversityHorizontalWhite"
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
        </div>
      </div>
    </div>
  );
};

export default LoadingResource;
