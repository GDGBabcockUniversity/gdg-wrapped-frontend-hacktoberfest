import Image from "next/image";

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
  return (
    <div
      id="TopMessageRoot"
      className="bg-black md:flex flex-col gap-10 w-full md:h-[1024px] items-start pt-16 md:px-[148px]"
    >
      <Image
        src="/logo.png"
        alt="GDGBabcockUniversityHorizontalWhite"
        height={100}
        width={655}
      />
      <div className="flex flex-col md:ml-12 gap-6 w-full md:w-4/5 items-start">
        <div className="relative flex flex-row  w-full font-sans md:mt-0 mt-5 items-start pt-[50px] md:pt-[303px] md:px-20">
          <div className="md:px-0 px-5 text-3xl md:text-5xl font-semibold text-[#34a853] absolute top-2 left-px h-[648px] w-full">
            And now presenting...
            <br />
            <span className="font-sans text-white">
              <br />
            </span>
            <span className="text-2xl md:text-6xl font-sans font-bold text-white">
              GDG on Campus Babcock
              <br />
              GENERAL
              {"  "}
              WRAPPED!
              <br />
              <br />
            </span>
            <span className="text-2xl md:text-3xl font-sans font-bold text-[#ea4235] pb-10">
              The efforts of these individuals shone through and we just had to
              recognize them. <br />
            </span>
            <span className="text-3xl font-sans font-bold text-white">
              <br />
            </span>
          </div>
          <Image
            src="/warp.svg"
            alt="Warp"
            width={500}
            height={500}
            className="hidden md:block w-8 h-8 absolute top-[209px] left-[715px]"
          />
          <Image
            src="/triangle.svg"
            alt="Triangle"
            width={500}
            height={500}
            className="hidden md:block w-3 h-6 absolute top-[319px] left-[740px]"
          />
          <Image
            src="/whitetriangle.svg"
            alt="WhiteTriangle"
            width={500}
            height={500}
            className="hidden md:block relative w-3 mt-4 mb-[303px]"
          />
          <Image
            src="/greydot.svg"
            alt="Vector6"
            width={500}
            height={500}
            className="hidden md:block w-3 h-3 absolute top-16 left-[752px]"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingGeneral;
