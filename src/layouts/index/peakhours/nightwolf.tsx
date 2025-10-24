export default function Nigtwold() {
  return (
    <div
      id="PeakHoursActivityRoot"
      className="bg-black relative flex flex-col justify-between gap-[173px] w-full font-sans items-start pt-12 pb-[317px] px-20"
    >
      <div className="relative flex flex-row justify-between w-full items-start">
        <img src="/logo.png" alt="GDSCBabcockUniversityHorizontalWhite" />
        <div
          id="PEAKHOURSOFACTIVITY"
          className="text-3xl font-black leading-[34.8px] text-[#4286f5] mt-6"
        >
          PEAK HOURS OF <br />
          ACTIVITY
        </div>
      </div>
      <div className="relative flex flex-col ml-40 gap-16 w-3/5 items-start">
        <div className="flex flex-col gap-10 w-full items-start">
          <div
            id="DonBabaNightingale2"
            className="text-4xl font-bold leading-[56px] text-[#ea4235]"
          >
            Don Baba<span className="font-sans text-white"> </span>
            <span className="font-sans text-[#34a853]">Nightingale!</span>
          </div>
          <div className="text-3xl leading-[42px] text-white">
            Normally we suppose dey sleep by this time but you <br />
            showed us that sleep is for the weak. You too much! <br />
            <br />
            You come alive for GDSC Babcock in the nighttime.
          </div>
        </div>
        <button
          id="Button1"
          className="bg-[#4286f5] flex flex-row justify-center pt-4 gap-3 w-2/5 h-12 cursor-pointer items-start rounded"
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
