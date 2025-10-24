import Image from "next/image";

export default function OyoyExpress() {
  return (
    <div
      id="PeakHoursActivityRoot"
      className="bg-black relative flex flex-col justify-between gap-[173px] w-full font-sans items-start pt-12 pb-[283px] px-20"
    >
      <Image
        src="/blueprogress.svg"
        alt="blueprogress"
        width={500}
        height={500}
        className="w-[500px] h-0 origin-top-left rotate-[-0.32deg] absolute top-48 left-24"
      />
      <Image
        src="/yellowprogress.svg"
        alt="yellow"
        width={500}
        height={500}
        className="w-[663px] h-0 origin-top-left rotate-[-0.32deg] absolute top-48 left-[381.7841796875px]"
      />
      <Image
        src="/greenprogress.svg"
        alt="green"
        width={500}
        height={500}
        className="w-[242px] h-0 origin-top-left rotate-[-0.32deg] absolute top-48 left-[847.4814453125px]"
      />
      <Image
        src="/redprogress.svg"
        alt="red"
        width={500}
        height={500}
        className="w-[380px] h-0 origin-top-left rotate-[-0.32deg] absolute top-48 left-[967.15771484375px]"
      />
      <div className="relative flex flex-row justify-between w-full items-start">
        <Image
          src="/logo.png"
          alt="GDGBabcockUniversityHorizontalWhite"
          width={500}
          height={500}
        />
        <div
          id="PEAKHOURSOFACTIVITY"
          className="text-3xl font-black leading-[34.8px] text-[#4286f5] mt-5"
        >
          PEAK HOURS OF <br />
          ACTIVITY
        </div>
      </div>
      <div className="relative flex flex-col ml-40 gap-16 w-2/3 items-start">
        <div className="flex flex-col gap-10 w-full items-start">
          <div
            id="OyoyoExpressManager1"
            className="text-4xl font-bold leading-[56px] text-[#ea4235]"
          >
            Oyoyo{" "}
            <span className="font-sans text-[#34a853]">
              Express Manager!{" "}
            </span>
          </div>
          <div className="text-3xl leading-[42px] text-white">
            You have kept us
            {"  "}
            entertained through multiple boring classes. <br />
            We cannot thank you enough. <br />
            <br />
            You are most active in the group chat activity during <br />
            the afternoon.
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
}
