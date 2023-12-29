import React from "react";

const DawnPatrol = () => {
  return (
    <div
      id="PeakHoursActivityRoot"
      className="bg-black relative flex flex-col justify-between gap-[149px] w-full font-['Inter'] items-start pt-12 pb-[271px] px-24"
    >
      <img
        src="/blueprogress.svg"
        alt="Vector"
        className="w-[500px] h-0 origin-top-left rotate-[-0.32deg] absolute top-48 left-24"
      />
      <img
        src="/yellowprogress.svg"
        alt="Vector1"
        className="w-[663px] h-0 origin-top-left rotate-[-0.32deg] absolute top-48 left-[381.7841796875px]"
      />
      <img
        src="/greenprogress.svg"
        alt="Vector2"
        className="w-[242px] h-0 origin-top-left rotate-[-0.32deg] absolute top-48 left-[847.4814453125px]"
      />
      <img
        src="/redprogress.svg"
        alt="Vector3"
        className="w-[380px] h-0 origin-top-left rotate-[-0.32deg] absolute top-48 left-[967.15771484375px]"
      />
      <div className="relative flex flex-row justify-between w-full items-start">
        <img src="/logo.png" alt="GDSCBabcockUniversityHorizontalWhite" />
        <div
          id="PEAKHOURSOFACTIVITY"
          className="text-3xl font-black leading-[34.8px] text-[#4286f5] mt-5"
        >
          PEAK HOURS OF <br />
          ACTIVITY
        </div>
      </div>
      <div className="relative flex flex-col ml-32 gap-20 w-3/4 items-start">
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
          <div className="text-3xl leading-[42px] text-[#cecece]">
            Your city thanks you for always waking us up with chatter. <br />
            <br />
            You are mostly active
            {"  "}
            in GDSC Babcock during the morning hours.
          </div>
        </div>
        <button
          id="Button1"
          className="bg-[#4286f5] flex flex-row justify-center pt-4 gap-3 w-1/3 h-12 cursor-pointer items-start rounded"
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
