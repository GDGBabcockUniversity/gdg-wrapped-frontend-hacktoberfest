import Image from "next/image";
import { useState } from "react";

type MessagesPercProps = {
  messages: string;
  handleNext: () => void;
  isbuttonVisible: boolean;
};
const MessagesPerc: React.FC<MessagesPercProps> = ({
  messages: messagesProp,
  handleNext,
  isbuttonVisible,
}) => {
  const [messages, setMessages] = useState<string>(messagesProp);
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
        <img src="/logo.png" 
            alt="GDSCBabcockUniversityHorizontalWhite" 
            width={500}
            height={500} />
        <div className="text-xl md:text-3xl font-black leading-[34.8px] text-[#fabc05] mt-5 md:ml-0 ml-4">
          CHATTER LEVEL
        </div>
      </div>
      <div className="relative flex flex-col mt-10 md:mt-0 ml-4 md:ml-32 md:gap-20 w-full md:w-4/5 items-start">
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
                <span className="font-sans text-[#ea4235]">Hoverine!</span>
              </div>
              <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
                It’s a cool name for people who never engage in the group.{" "}
                <br />
                <br />
                We hope you’ll change that in the new year though.
              </div>
            </>
          )}
        {messages === "Top 1%" && (
          <div className="flex flex-col gap-10 w-full font-sans items-start">
            <div className="text-4xl font-bold leading-[56px] text-[#34a853] ml-px">
              Distinguished member of the <br />
              <span className="font-sans text-[#ea4235]">
                “Always Online”{" "}
              </span>
              <div className="font-sans">Association.</div>
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
              You are in the top 1% of chatterboxes in our community. <br />
              <br />
              Always there to spark gist and discussion and gist for us all.
            </div>
          </div>
        )}
        {messages === "Top 5%" && (
          <div className="flex flex-col gap-10 w-full font-sans items-start">
            <div className="text-4xl font-bold leading-[56px] text-[#34a853] ml-px">
              <div
                id="TheNewsFlashRoot"
                className="text-4xl font-sans font-bold leading-[56px] text-[#34a853] md:w-min"
              >
                The News <span className="text-[#ea4235]">Flash!</span>
              </div>

              <div className="font-sans">Association.</div>
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
              You are in the top 5% of chatterboxes in our community. <br />
              <br />
              Always there to spark gist and discussion and gist for us all.
            </div>
          </div>
        )}
        {messages === "Top 10%" && (
          <div className="flex flex-col gap-10 w-full font-sans items-start">
            <div
              id="CruiseDirector1"
              className="text-4xl font-bold leading-[56px] text-[#34a853]"
            >
              Cruise{" "}
              <span className="font-sans text-[#ea4235]">Director!</span>
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
              You are in the top 10% of chatterboxes in our community. <br />
              <br />
              Don’t stop talking.
            </div>
          </div>
        )}
        {messages === "Top 20%" && (
          <div className="flex flex-col gap-10 w-full font-sans items-start">
            <div
              id="OgaRadio1"
              className="text-4xl font-bold leading-[56px] text-[#34a853]"
            >
              Oga <span className="font-sans text-[#ea4235]">Radio!</span>
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
              You are in the top 20% of chatterboxes in our community. <br />
              <br />
              Don’t stop talking.
            </div>
          </div>
        )}
        {messages === "Top 30%" && (
          <div className="flex flex-col gap-10 w-full font-sans items-start">
            <div
              id="DrDiscourse1"
              className="text-4xl font-bold leading-[56px] text-[#34a853]"
            >
              Dr.{" "}
              <span className="font-sans text-[#ea4235]">Discourse!</span>
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
              You are in the top 30% of chatterboxes in our community. <br />
              <br />
              Don’t stop talking.
            </div>
          </div>
        )}
        <button
          id="Button1"
          className="bg-[#fabc05] w-[95%] md:w-1/3 h-12 cursor-pointer items-start rounded"
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

export default MessagesPerc;
