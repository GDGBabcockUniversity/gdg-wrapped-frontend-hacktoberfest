import Image from "next/image";
import { useState } from "react";

type MessagesPercProps = {
  messages: string;
  handleNext: () => void;
};
const MessagesPerc: React.FC<MessagesPercProps> = ({
  messages: messagesProp,
  handleNext,
}) => {
  const [messages, setMessages] = useState<string>(messagesProp);
  return (
    <div
      id="TopMessageRoot"
      className="bg-black relative flex flex-col justify-between gap-[177px] w-full font-['Inter'] items-start pt-12 pb-[369px] px-24"
    >
      <Image
        src="/topprogress.svg"
        alt="Vector"
        className="w-[500px] h-0 origin-top-left rotate-[-0.32deg] absolute top-48 left-24"
      />

      <div className="relative flex flex-row justify-between w-full items-start">
        <img src="/logo.png" alt="GDSCBabcockUniversityHorizontalWhite" />
        <div className="text-3xl font-black leading-[34.8px] text-[#fabc05] mt-8">
          CHATTER LEVEL
        </div>
      </div>
      <div className="relative flex flex-col ml-32 gap-12 w-2/3 items-start">
        {messages !== "Top 1%" &&
          messages !== "Top 5%" &&
          messages !== "Top 10%" &&
          messages !== "Top 20%" &&
          messages !== "Top 30%" &&
          messages !== "Top 75%" &&
          messages !== "Top 100%" && (
            <>
              <div
                id="TheHoverine1"
                className="text-4xl font-bold leading-[56px] text-[#34a853] mb-px ml-px"
              >
                The{" "}
                <span className="font-['Inter'] text-[#ea4235]">Hoverine!</span>
              </div>
              <div className="text-3xl leading-[42px] text-[#cecece]">
                It’s a cool name for people who never engage in the group.{" "}
                <br />
                <br />
                We hope you’ll change that in the new year though.
              </div>
            </>
          )}
        {messages === "Top 1%" && (
          <div className="flex flex-col gap-10 w-full font-['Inter'] items-start">
            <div className="text-4xl font-bold leading-[56px] text-[#34a853] ml-px">
              Distinguished member of the <br />
              <span className="font-['Inter'] text-[#ea4235]">
                “Always Online”{" "}
              </span>
              <div className="font-['Inter']">Association.</div>
            </div>
            <div className="text-3xl leading-[42px] text-[#cecece]">
              You are in the top 1% of chatterboxes in our community. <br />
              <br />
              Always there to spark gist and discussion and gist for us all.
            </div>
          </div>
        )}
        {messages === "Top 5%" && (
          <div className="flex flex-col gap-10 w-full font-['Inter'] items-start">
            <div className="text-4xl font-bold leading-[56px] text-[#34a853] ml-px">
              <div
                id="TheNewsFlashRoot"
                className="text-4xl font-['Inter'] font-bold leading-[56px] text-[#34a853] w-min"
              >
                The News <span className="text-[#ea4235]">Flash!</span>
              </div>

              <div className="font-['Inter']">Association.</div>
            </div>
            <div className="text-3xl leading-[42px] text-[#cecece]">
              You are in the top 5% of chatterboxes in our community. <br />
              <br />
              Always there to spark gist and discussion and gist for us all.
            </div>
          </div>
        )}
        {messages === "Top 10%" && (
          <div className="flex flex-col gap-10 w-full font-['Inter'] items-start">
            <div
              id="CruiseDirector1"
              className="text-4xl font-bold leading-[56px] text-[#34a853]"
            >
              Cruise{" "}
              <span className="font-['Inter'] text-[#ea4235]">Director!</span>
            </div>
            <div className="text-3xl leading-[42px] text-[#cecece]">
              You are in the top 10% of chatterboxes in our community. <br />
              <br />
              Don’t stop talking.
            </div>
          </div>
        )}
        {messages === "Top 20%" && (
          <div className="flex flex-col gap-10 w-full font-['Inter'] items-start">
            <div
              id="OgaRadio1"
              className="text-4xl font-bold leading-[56px] text-[#34a853]"
            >
              Oga <span className="font-['Inter'] text-[#ea4235]">Radio!</span>
            </div>
            <div className="text-3xl leading-[42px] text-[#cecece]">
              You are in the top 20% of chatterboxes in our community. <br />
              <br />
              Don’t stop talking.
            </div>
          </div>
        )}
        {messages === "Top 30%" && (
          <div className="flex flex-col gap-10 w-full font-['Inter'] items-start">
            <div
              id="DrDiscourse1"
              className="text-4xl font-bold leading-[56px] text-[#34a853]"
            >
              Dr.{" "}
              <span className="font-['Inter'] text-[#ea4235]">Discourse!</span>
            </div>
            <div className="text-3xl leading-[42px] text-[#cecece]">
              You are in the top 30% of chatterboxes in our community. <br />
              <br />
              Don’t stop talking.
            </div>
          </div>
        )}
        <button
          id="Button1"
          className="bg-[#fabc05] flex flex-row justify-center pt-4 gap-3 w-1/3 h-12 cursor-pointer font-['Inter'] items-start rounded"
          onClick={handleNext}
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

export default MessagesPerc;
