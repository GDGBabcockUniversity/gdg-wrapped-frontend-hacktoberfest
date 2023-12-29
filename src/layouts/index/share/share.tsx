import Image from "next/image";

export default function SharePage() {
  return (
    <div
      id="TopMessageRoot"
      className="overflow-hidden bg-black relative flex flex-col justify-between gap-32 w-full font-['Inter'] items-start pt-16 pb-[281px] px-[148px]"
    >
      <Image
        src="/topprogress.svg"
        width={500}
        height={8}
        alt="Vector"
        className="w-[500px] h-2 origin-top-left rotate-[-0.32deg] absolute top-48 "
      />
      <Image
        src="/logo.png"
        height={100}
        width={655}
        alt="GDSCBabcockUniversityHorizontalWhite"
        className="relative"
      />
      <div className="text-5xl font-semibold text-[#34a853] relative ml-8 w-3/5 font-['Inter']">
        Omo Ologo!
        <br />
        <span className="text-white">
          <br />
        </span>
        <span className="text-5xl text-white">
          We spent time cooking this Wrapped for you so share it and tag us{" "}
        </span>
        <span className="text-5xl text-[#ea4235]">@gdcsbabcock</span>
        <span className="text-5xl text-white">
          {" "}
          make our food no burn.
          <br />
        </span>
        <span className="text-white">
          <br />
        </span>
        <span className="text-[#fabc05]">See you next time!</span>
        <Image
          src={"/share.svg"}
          width={500}
          height={800}
          alt="Share"
          className="absolute top-[-100px] left-[700px]"
        />
      </div>
    </div>
  );
}
