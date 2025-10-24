import Image from "next/image";

export default function SharePage() {
  return (
    <div
      id="TopMessageRoot"
      className="overflow-hidden bg-black relative flex flex-col justify-between gap-20 md:gap-32 w-full font-sans items-start pt-16 md:pb-[281px] md:px-[148px]"
    >
      <Image
        src="/topprogress.svg"
        alt="Vector"
        width={1269}
        height={181}
        className="w-[90%] md:w-[1269px] h-10 origin-top-left rotate-[-0.16deg] absolute top-[8rem] md:top-48 md:left-24 left-[5%]"
      />
      <Image
        src="/logo.png"
        height={100}
        width={655}
        alt="GDSCBabcockUniversityHorizontalWhite"
        className="relative"
      />
      <div className="text-5xl font-semibold text-[#34a853] relative ml-[5%] md:ml-8 w-[90%] md:w-3/5 font-sans">
        Omo Ologo!
        <br />
        <span className="text-white">
          <br />
        </span>
        <span className="text-3xl md:text-5xl text-white">
          We spent time cooking this Wrapped for you so share it and tag us{" "}
        </span>
        <span className="text-3xl md:text-5xl text-[#ea4235]">@gdcsbabcock</span>
        <span className="text-3xl md:text-5xl text-white">
          {" "}
          make our food no burn.
          <br />
        </span>
        <span className="text-white">
          <br />
        </span>
        <span className="text-3xl md:text-5xl text-[#fabc05]">See you next time!</span>
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
