import Image from "next/image";
import { useState } from "react";

type QuestionPercentileProps = {
  question: string;
  handleNext: () => void;
  isbuttonVisible: boolean;
};

const QuestionPercentile: React.FC<QuestionPercentileProps> = ({
  question: questionProp,
  handleNext,
  isbuttonVisible,
}) => {
  const [question, setQuestion] = useState<string>(questionProp);
  return (
    <div
      id="QuestionRoot"
      className="bg-black relative flex flex-col justify-between gap-[50px] md:gap-[177px] w-full font-sans items-start pt-12 md:pb-[329px] md:px-24"
    >
      <Image
        src="/topprogress.svg"
        alt="Vector"
        width={1269}
        height={181}
        className="w-[1269px] h-10 origin-top-left rotate-[-0.16deg] absolute top-[10.5rem] md:top-48 md:left-24"
      />
      <div className="relative md:flex flex-row justify-between w-full items-start">
        <Image
          src="/logo.png"
          height={100}
          width={655}
          alt="GDGBabcockUniversityHorizontalWhite"
        />
        <div className="text-center text-3xl font-black leading-[34.8px] text-[#34a853] mt-8">
          CURIOSITY METER
        </div>
      </div>
      <div className="relative flex flex-col ml-[5%] md:ml-32 gap-10 w-[90%] md:w-4/5 items-start">
        {question !== "Top 1%" &&
          question !== "Top 5%" &&
          question !== "Top 10%" &&
          question !== "Top 25%" &&
          question !== "Top 50%" &&
          question !== "Top 75%" &&
          question !== "Top 100%" && (
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece] w-full">
              If you never bother us with your questions, it blocks us from
              getting to know you and that makes us sad.
              <br />
              <br />
              Try to break out of your mystery and ask more questions.
            </div>
          )}

        {question === "Top 1%" && (
          <>
            <div className="text-4xl font-bold leading-[56px] text-[#fabc05]">
              Top 1%
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
              You are in the top 1% of those who ask questions in our group
              chats! <br />
              <br />
              You make our efforts worth it!
            </div>
          </>
        )}

        {question === "Top 5%" && (
          <>
            <div className="text-4xl font-bold leading-[56px] text-[#fabc05]">
              Top 5%
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece] ml-px">
              You are in the top 5% of those who ask questions in our group
              chats! <br />
              <br />
              We trust that you are learning everyday.
            </div>
          </>
        )}

        {question === "Top 10%" && (
          <>
            <div className="text-4xl font-bold leading-[56px] text-[#fabc05]">
              Top 10%
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
              You are in the top 10% of those who ask questions in our group
              chats! <br />
              <br />
              You ask, we answer. That’s how a good relationship works.
            </div>
          </>
        )}

        {question === "Top 20%" && (
          <>
            <div className="text-4xl font-bold leading-[56px] text-[#fabc05]">
              Top 20%
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
              You are in the top 20% of those who ask questions in our group
              chats! <br />
              <br />
              You make our efforts worth it!
            </div>
          </>
        )}
        {question === "Top 30%" && (
          <>
            <div className="text-4xl font-bold leading-[56px] text-[#fabc05]">
              Top 30%
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece]">
              You are in the top 30% of those who ask questions in our group
              chats! <br />
              <br />
              We trust that you are learning everyday
            </div>
          </>
        )}

        <button
          id="Button1"
          className="bg-[#34a853] px-2 w-full md:w-1/3 h-12 cursor-pointer font-sans items-start rounded"
          onClick={() => handleNext()}
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

export default QuestionPercentile;
