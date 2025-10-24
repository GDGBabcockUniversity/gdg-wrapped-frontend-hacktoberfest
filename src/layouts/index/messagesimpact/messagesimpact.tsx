import Image from "next/image";
import { useState } from "react";

type MessagesImpactProps = {
  messageimpact: string;
  handleNext: () => void;
  isbuttonVisible: boolean;
};

const MessagesImpact: React.FC<MessagesImpactProps> = ({
  messageimpact: messageimpactProp,
  handleNext,
  isbuttonVisible,
}) => {
  const [messageimpact, setMessageImpact] = useState<string>(messageimpactProp);
  return (
    <div
      id="TopMessageRoot"
      className="bg-black relative flex flex-col justify-between gap-[90px] md:gap-[177px] w-full font-sans items-start pt-12 md:pb-[369px] md:px-24"
    >
      <Image
        src="/topprogress.svg"
        alt="Vector"
        width={1269}
        height={181}
        className="w-[90%] md:w-[1269px] h-10 origin-top-left rotate-[-0.16deg] absolute top-[12rem] md:top-48 md:left-24 left-[5%]"
      />
      <div className="relative md:flex flex-row gap-20 w-full items-start">
        <Image
          src="/logo.png"
          alt="GDSCBabcockUniversityHorizontalWhite"
          height={100}
          width={655}
        />
        <div
          id="MESSAGEIMPACT"
          className="md:text-start text-center text-3xl font-black leading-[34.8px] text-[#4286f5] mt-8"
        >
          MESSAGE IMPACT{" "}
        </div>
      </div>
      <div className="relative flex flex-col mt-10 md:mt-0 ml-4 md:ml-32 md:gap-20 w-full md:w-4/5 items-start">
        {messageimpact !== "Top 1%" &&
          messageimpact !== "Top 5%" &&
          messageimpact !== "Top 10%" &&
          messageimpact !== "Top 20%" &&
          messageimpact !== "Top 30%" &&
          messageimpact !== "Top 75%" &&
          messageimpact !== "Top 100%" && (
            <>
              <div
                id="GhostWriter2"
                className="text-4xl font-bold leading-[56px] text-[#34a853] mb-px"
              >
                Ghost<span className="font-sans text-white"> </span>
                <span className="font-sans text-[#fabc05]">Writer!</span>
              </div>
              <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
                We didn’t feel you this year as much as we would have loved to.
                <br />
                <br />
                Don’t be shy, we want to hear from you.
              </div>
            </>
          )}
        {messageimpact === "Top 1%" && (
          <div className="flex flex-col gap-6 w-full font-sans items-start">
            <div className="text-4xl font-bold leading-[56px] text-[#fabc05]">
              GDSC Babcock
              <span className="font-sans text-[#34a853]">
                {" "}
                Oga Patapata of Tech!
              </span>
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece] md:mb-[-21px] w-full">
              You carry this community on your shoulders by showing us that
              sharing is caring. <br />
              <br />
              We appreciate you!
            </div>
          </div>
        )}
        {messageimpact === "Top 5%" && (
          <div className="flex flex-col gap-12 w-full font-sans items-start">
            <div className="text-4xl font-bold leading-[56px] text-[#34a853]">
              GDSC Babcock
              <span className="font-sans text-[#fabc05]">
                {" "}
                Tech Titan!
              </span>
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
              You are the one who always knows the right things to send our way.
              <br />
              <br />
              We celebrate you!
            </div>
          </div>
        )}
        {messageimpact === "Top 10%" && (
          <div className="flex flex-col gap-12 w-full font-sans items-start">
            <div className="text-4xl font-bold leading-[56px] text-[#34a853]">
              GDSC Babcock{" "}
              <span className="font-sans text-[#fabc05]">
                Tech Pepper!
              </span>
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
              You have Stack Overflow memorized to a T. <br />
              <br />
              Thank you for contributing to the progress of this community!
            </div>
          </div>
        )}

        {messageimpact === "Top 20%" && (
          <div className="flex flex-col gap-12 w-full font-sans items-start">
            <div className="text-4xl font-bold leading-[56px] text-[#fabc05]">
              GDSC Babcock
              <span className="font-sans text-[#34a853]">
                {" "}
                Tech Terminator!
              </span>
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
              When our code misbehaves, you are there to make it behave. <br />
              <br />
              Thank you for sharing with us.
            </div>
          </div>
        )}
        {messageimpact === "Top 30%" && (
          <div className="flex flex-col gap-12 w-full font-sans items-start">
            <div className="text-4xl font-bold leading-[56px] text-[#34a853]">
              GDSC Babcock{" "}
              <span className="font-sans text-[#fabc05]">
                Tech Whisperer!
              </span>
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
              You have gone to great lengths to bring knowledge our way.
              <br />
              <br />
              We wish you as much love as you have shown us.
            </div>
          </div>
        )}
        <button
          id="Button1"
          className="bg-[#4286f5] w-[95%] md:w-1/3 h-12 cursor-pointer items-start rounded"
          onClick={handleNext}
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

export default MessagesImpact;
