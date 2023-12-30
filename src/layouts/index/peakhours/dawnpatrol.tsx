import Image from "next/image";
import React, { use, useEffect } from "react";
type DawnPatrolProps = {
  style?: React.CSSProperties;
  hour: number;
  isbuttonVisible: boolean;
  setHour: (value: number) => void;
  hanldeNext: () => void;
};
const DawnPatrol: React.FC<DawnPatrolProps> = ({
  style,
  hour: hourProp,
  setHour: setHourProp,
  hanldeNext,
  isbuttonVisible,
}) => {
  const [hour, setHour] = React.useState<number>(hourProp);
  useEffect(() => {
    setHourProp(hour);
  }, [hour]);
  return (
    <div
      id="PeakHoursActivityRoot"
      className="bg-black relative flex flex-col justify-between gap-[149px] w-full font-['Inter'] items-start md:pt-12 md:pb-[271px] md:px-24 p-5"
    >
      <div className="relative md:flex flex-row justify-between w-full font-['Inter'] items-start md:pl-3 md:pr-16">
        <Image
          src="/topprogress.svg"
          alt="blueprogress"
          height={6}
          width={1730}
          className="w-[1730px] h-1.5 origin-top-left rotate-[-0.32deg] absolute top-[147.0733642578125px] left-0"
        />
        {/* <Image
        src="/yellowprogress.svg"
        alt="yellow"
        width={663}
        height={6}
        className="w-[663px] h-1.5 origin-top-left rotate-[-0.32deg] absolute top-48 left-[381.7841796875px]"
      />
      <Image
        src="/greenprogress.svg"
        alt="green"
        width={242}
        height={6}
        className="w-[242px] h-1.5 origin-top-left rotate-[-0.32deg] absolute top-48 left-[847.4814453125px]"
      />
      <Image
        src="/redprogress.svg"
        alt="red"
        width={380}
        height={6}
        className="w-[380px] h-1.5 origin-top-left rotate-[-0.32deg] absolute top-48 left-[967.15771484375px]"
      /> */}
        <div className="relative md:flex flex-row justify-between w-full items-start">
          <Image
            src="/logo.png"
            alt="GDSCBabcockUniversityHorizontalWhite"
            width={500}
            height={500}
          />
          <div
            id="PEAKHOURSOFACTIVITY"
            className="text-xl md:text-3xl font-black leading-[34.8px] text-[#4286f5] mt-5"
          >
            PEAK HOURS OF <br className="hidden md:block" />
            ACTIVITY
          </div>
        </div>
      </div>
      <div className="relative flex flex-col md:ml-32 gap-20 w-full md:w-3/4 items-start">
        {hour >= 1 && hour <= 11 && (
          <div className="flex flex-col gap-6 w-full items-start">
            <div className="text-4xl font-semibold leading-[56px] text-white">
              You are a member of the{" "}
              <span className="font-['Inter'] font-bold text-[#ea4235]">
                Dawn Patrol. <br />
              </span>
              <div className="font-['Inter']">Honorable Shareholder in the</div>
              <span className="font-['Inter'] text-[#4285f6]"> </span>
              <span className="font-['Inter'] text-[#34a853]">“</span>
              <span className="font-['Inter'] font-bold text-[#34a853]">
                Up and <br />
                Grateful” Association.{" "}
              </span>
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
              Your city thanks you for always waking us up with chatter. <br />
              <br />
              You are mostly active
              {"  "}
              in GDSC Babcock during the morning hours.
            </div>
          </div>
        )}{" "}
        {hour >= 12 && hour <= 15 && (
          <div className="flex flex-col gap-10 w-full items-start">
            <div
              id="OyoyoExpressManager1"
              className="text-4xl font-bold leading-[56px] text-[#ea4235]"
            >
              Oyoyo{" "}
              <span className="font-['Inter'] text-[#34a853]">
                Express Manager!{" "}
              </span>
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-white">
              You have kept us
              {"  "}
              entertained through multiple boring classes. <br />
              We cannot thank you enough. <br />
              <br />
              You are most active in the group chat activity during <br />
              the afternoon.
            </div>
          </div>
        )}
        {hour >= 16 && hour <= 20 && (
          <div className="flex flex-col gap-10 w-full items-start">
            <div
              id="ToriNoDeyFinishFM3"
              className="text-4xl font-bold leading-[56px] text-[#ea4235]"
            >
              97.2<span className="font-['Inter'] text-white"> </span>
              <span className="font-['Inter'] text-[#34a853]">
                “Tori No Dey Finish”
              </span>
              <span className="font-['Inter'] text-white"> FM! </span>
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-white">
              Our evening walks are all that more pleasant because of you.{" "}
              <br />
              Three gbosa for you! <br />
              <br />
              You mostly have time to talk to us in the evening.
            </div>
          </div>
        )}
        {hour >= 21 && hour <= 23 && (
          <div className="flex flex-col gap-10 w-full items-start">
            <div
              id="DonBabaNightingale2"
              className="text-4xl font-bold leading-[56px] text-[#ea4235]"
            >
              Don Baba<span className="font-['Inter'] text-white"> </span>
              <span className="font-['Inter'] text-[#34a853]">
                Nightingale!
              </span>
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-white">
              Normally we suppose dey sleep by this time but you <br />
              showed us that sleep is for the weak. You too much! <br />
              <br />
              You come alive for GDSC Babcock in the nighttime.
            </div>
          </div>
        )}
        <button
          id="Button1"
          className="bg-[#4286f5] md:w-1/3 h-12 cursor-pointer font-['Inter'] rounded w-full mt-2 md:mt-0"
          onClick={hanldeNext}
          style={{ visibility: isbuttonVisible ? "visible" : "hidden" }}
        >
          <div
            id="Label"
            className="text-center text-lg leading-[24px] text-white"
          >
            Next
          </div>
        </button>
      </div>
    </div>
  );
};

export default DawnPatrol;
