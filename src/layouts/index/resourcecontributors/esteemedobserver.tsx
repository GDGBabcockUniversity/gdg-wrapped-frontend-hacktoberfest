import Image from "next/image";
import React from "react";
type EsteemedObserverProps = {
  resourcePerc: string;
  handleNext: () => void;
  isbuttonVisible: boolean;
};
const EsteemedObserver: React.FC<EsteemedObserverProps> = ({
  resourcePerc: resourcePercProp,
  handleNext,
  isbuttonVisible,
}) => {
  const [resourcePerc, setResourcePerc] =
    React.useState<string>(resourcePercProp);
  return (
    <div
      id="ResourceCRoot"
      className="bg-black relative flex flex-col justify-between md:gap-[177px] w-full font-sans items-start pt-12 md:pb-[293px] md:px-24"
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
            alt="GDGBabcockUniversityHorizontalWhite" 
            width={500}
            height={500} />
        <div className="text-xl md:text-3xl font-black leading-[34.8px] text-[#fabc05] mt-5 md:ml-0 ml-4">
          This is a measure of all the good <br className="md:block hidden" />
          stuff you have shared with us.
        </div>
      </div>
      <div className="relative flex flex-col mt-10 md:mt-0 ml-4 md:ml-32 md:gap-20 w-full md:w-4/5 items-start">
        {resourcePerc !== "Top 1%" &&
          resourcePerc !== "Top 5%" &&
          resourcePerc !== "Top 10%" &&
          resourcePerc !== "Top 25%" &&
          resourcePerc !== "Top 50%" &&
          resourcePerc !== "Top 75%" &&
          resourcePerc !== "Top 100%" && (
            <div className="flex flex-col gap-12 w-full items-start">
              <div
                id="EsteemedObserver2"
                className="text-4xl font-bold leading-[56px] text-[#fabc05]"
              >
                Esteemed<span className="font-sans text-white"> </span>
                <span className="font-sans text-[#4286f5]">Observer!</span>
              </div>
              <div className="text-xl md:text-3xl md:px-0 leading-[42px] text-[#cecece] w-[95%]">
                At this point you are our Oga. We live to supply all your
                resource needs and you no even do giveaway for us. <br />
                <br />
                No be so o.
              </div>
            </div>
          )}

        {resourcePerc === "Top 1%" && (
          <div className="flex flex-col gap-12 w-full font-sans items-start">
            <div className="text-4xl font-bold leading-[56px] text-[#4286f5]">
              Top 1%
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece] w-[95%]">
              You are in the top 1% of resource contributors to our community.
              <br />
              With you on board,we can always rest easy. Our ultimate MVP!
            </div>
          </div>
        )}

        {resourcePerc === "Top 5%" && (
          <div className="flex flex-col gap-12 w-full font-sans items-start">
            <div className="text-4xl font-bold leading-[56px] text-[#4286f5]">
              Top 5%
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece] w-[95%]">
              You are a top 5% of resource contributors to our community. <br />
              The cream of the crop!
              <br />
            </div>
          </div>
        )}

        {resourcePerc === "Top 10%" && (
          <div className="flex flex-col gap-12 w-full font-sans items-start">
            <div className="text-4xl font-bold leading-[56px] text-[#4286f5]">
              Top 10%
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece] w-[95%]">
              You are in the top 10% of resource contributors to our community.
              <br />
              Not just the icing on top, you are the whole treat itself!
            </div>
          </div>
        )}
        {resourcePerc === "Top 20%" && (
          <div className="flex flex-col gap-12 w-full font-sans items-start">
            <div className="text-4xl font-bold leading-[56px] text-[#4286f5]">
              Top 20%
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece] w-[95%]">
              You are in the top 20% of resource contributors to our community.
              <br />
              Our tech journey is smooth because of you.
            </div>
          </div>
        )}
        {resourcePerc === "Top 35%" && (
          <div className="flex flex-col gap-12 w-full font-sans items-start">
            <div className="text-4xl font-bold leading-[56px] text-[#4286f5]">
              Top 30%
            </div>
            <div className="text-xl md:text-3xl leading-[42px] text-[#cecece] w-[95%]">
              You are in the top 30% of resource contributors to our community.
              <br />
              Thank you for all that you give to us.
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

export default EsteemedObserver;
