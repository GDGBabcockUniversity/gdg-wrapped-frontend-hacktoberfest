import Image from "next/image";
import { useEffect, useState } from "react";

type LoadingGeneralProps = {
  style?: React.CSSProperties;
  isDone: boolean;
  setIsDone: (value: boolean) => void;
};
const LoadingGeneral: React.FC<LoadingGeneralProps> = ({
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
      id="TopMessageRoot"
      className="bg-black flex flex-col gap-20 w-full items-start pt-16 pb-24 px-[148px]"
    >
      <Image
        src="/logo.png"
        alt="GDSCBabcockUniversityHorizontalWhite"
        height={100}
        width={655}
      />
      <div className="flex flex-col ml-12 gap-6 w-4/5 items-start">
        <div className="flex flex-row justify-between ml-[873px] w-6 items-start"></div>
        <div className="relative flex flex-row  w-full font-['Inter'] items-start pt-[303px] px-20">
          <div className="text-5xl font-semibold text-[#34a853] absolute top-2 left-px h-[648px] w-full">
            And now, the section you have been waiting for...
            <br />
            <span className="font-['Inter'] text-white">
              <br />
            </span>
            <span className="text-6xl font-['Inter'] font-bold text-white">
              GDSC BABCOCK
              <br />
              GENERAL
              {"  "}
              WRAPPED!
              <br />
              <br />
            </span>
            <span className="text-3xl font-['Inter'] font-bold text-[#ea4235] pb-10">
              The efforts of these individuals shone through and we just had to
              recognize them. <br />
            </span>
            <span className="text-3xl font-['Inter'] font-bold text-white">
              <br />
            </span>
          </div>
          <Image
            src="/warp.svg"
            alt="Warp"
            width={500}
            height={500}
            className="w-8 h-8 absolute top-[209px] left-[715px]"
          />
          <Image
            src="/triangle.svg"
            alt="Triangle"
            width={500}
            height={500}
            className="w-3 h-6 absolute top-[319px] left-[740px]"
          />
          <Image
            src="/whitetriangle.svg"
            alt="WhiteTriangle"
            width={500}
            height={500}
            className="relative w-3 mt-4 mb-[303px]"
          />
          <Image
            src="/greydot.svg"
            alt="Vector6"
            width={500}
            height={500}
            className="w-3 h-3 absolute top-16 left-[752px]"
          />
          <div className="border-solid border-[#e3e3e3] w-2/5 h-8 bg-[#f4f4f4] absolute top-[352px] left-0 flex flex-row items-start pt-1 px-3 border rounded-lg">
            <div
              className="bg-[#fabc05] w-3/5 h-5 rounded"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingGeneral;
