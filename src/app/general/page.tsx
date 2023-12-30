"use client";
import LoadingGeneral from "@/layouts/general/loading";
import { fetchGeneralData } from "@/services/general.handler";
import { Data, SuccessGeneralResponse } from "@/types/general.types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function General() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [general, setGeneral] = useState<Data>();
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    async function fetchData() {
      const response = await FetchGeneralData();
      setGeneral((response as SuccessGeneralResponse).data);
    }
    fetchData();
  }, []);
  return (
    <>
      {isLoading && !isDone && (
        <LoadingGeneral setIsDone={setIsDone} isDone={isDone} />
      )}

      {isDone && step === 1 && (
        <div
          id="GeneralRoot"
          className="bg-black relative flex flex-col justify-between gap-48 w-full font-['Inter'] items-start pt-12 pb-[245px] px-32"
        >
          <Image
            src="/blueprogress.svg"
            alt="progress"
            width={500}
            height={500}
            className="w-[500px] h-0 origin-top-left rotate-[-0.32deg] absolute top-48 left-32"
          />
          <Image
            src="/yellowprogress.svg"
            alt="progress"
            width={663}
            height={500}
            className="w-[663px] h-0 origin-top-left rotate-[-0.32deg] absolute top-48 left-[422.7841796875px]"
          />
          <Image
            src="greenprogress.svg"
            alt="progress"
            width={242}
            height={500}
            className="w-[242px] h-0 origin-top-left rotate-[-0.32deg] absolute top-48 left-[888.4813232421875px]"
          />
          <Image
            src="redprogress.svg"
            alt="progress"
            width={380}
            height={500}
            className="w-[380px] h-0 origin-top-left rotate-[-0.32deg] absolute top-48 left-[1008.15771484375px]"
          />
          <div className="relative flex flex-row justify-between ml-4 w-full items-start">
            <Image
              src="/logo.png"
              alt="GDSCBabcockUniversityHorizontalWhite"
              width={655}
              height={100}
            />
            <div className="text-3xl font-black leading-[34.8px] text-[#ea4235] mt-5">
              GENERAL GDSC
              <br />
              BABCOCK WRAPPED
            </div>
          </div>
          <div className="relative flex flex-col justify-between ml-8 gap-[117px] w-3/4 items-start">
            <div className="flex flex-col gap-2 w-full items-start">
              <div className="text-4xl font-bold leading-[56px] text-[#34a853]">
                Most active GDSC Babcock members
              </div>
              <div className="flex flex-row ml-px gap-24 w-full items-start">
                <div className="text-2xl leading-[33.6px] text-[#cecece] ">
                  {general?.most_active_members_per_track
                    .slice(0, 6)
                    .map((member) => (
                      <div key={member.name}>
                        • {member.name}
                        <br />
                      </div>
                    ))}
                </div>
                <div className="text-2xl leading-[33.6px] text-[#cecece] mb-2">
                  {general?.most_active_members_per_track
                    .slice(7)
                    .map((member) => (
                      <div key={member.name}>
                        • {member.name}
                        <br />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <button
              id="Button1"
              className="bg-[#ea4235] flex flex-row justify-center pt-4 gap-3 w-1/3 h-12 cursor-pointer items-start rounded"
              onClick={() => {
                setStep(2);
              }}
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
      )}
      {isDone && step === 2 && (
        <div className="bg-black flex flex-col px-20 py-12 max-md:px-5">
          <div className="self-stretch flex items-stretch justify-between gap-5 ml-3.5 max-md:max-w-full max-md:flex-wrap">
            <Image
              src="/logo.png"
              alt="GDSCBabcockUniversityHorizontalWhite"
              width={655}
              height={100}
              className="aspect-[6.62] object-contain object-center w-[655px] overflow-hidden max-md:max-w-full"
            />
            <div className="text-red-500 text-3xl font-black leading-9 self-center grow shrink basis-auto my-auto max-md:max-w-full">
              GDSC BABCOCK WRAPPED
            </div>
          </div>
          <Image
            src="/topprogress.svg"
            alt="progress"
            width={1269}
            height={181}
            className="aspect-[181.29] object-contain object-center w-[1269px] overflow-hidden self-center ml-3.5 mt-10 max-md:max-w-full max-md:mt-10"
          />
          <div className="text-green-600 text-4xl font-bold leading-[56px] ml-14 mt-36 self-start max-md:max-w-full max-md:mt-10">
            Most active members per group
          </div>
          <div className="relative flex flex-col justify-between ml-8 gap-[117px] w-3/4 items-start">
            <div className="flex flex-col gap-2 w-full items-start">
              <div className="flex flex-row ml-px gap-24 w-full items-start">
                <div className="text-2xl leading-[33.6px] text-[#cecece] ">
                  {general?.most_active_members_per_track
                    .slice(0, 6)
                    .map((member) => (
                      <div key={member.name}>
                        • {member.group_chat} - {member.name}
                        <br />
                      </div>
                    ))}
                </div>
                <div className="text-2xl leading-[33.6px] text-[#cecece] mb-2">
                  {general?.most_active_members_per_track
                    .slice(7)
                    .map((member) => (
                      <div key={member.name}>
                        •{member.group_chat} - {member.name}
                        <br />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <button
              id="Button1"
              className="bg-[#ea4235] flex flex-row justify-center pt-4 gap-3 w-1/3 h-12 cursor-pointer items-start rounded"
              onClick={() => {
                setStep(3);
              }}
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
      )}
      {isDone && step === 3 && (
        <div
          id="GeneralRoot"
          className="bg-black relative flex flex-col justify-between gap-[146px] w-full font-['Inter'] items-start pt-12 pb-[237px] px-20"
        >
          <Image
            src="/topprogress.svg"
            alt="Vector"
            width={1269}
            height={181}
            className="w-[1269px] h-10 origin-top-left rotate-[-0.16deg] absolute top-48 left-24"
          />
          <div className="relative flex flex-row justify-between ml-12 w-full items-start">
            <Image
              src="/logo.png"
              alt="GDSCBabcockUniversityHorizontalWhite"
              width={655}
              height={100}
            />
            <div className="text-3xl font-black leading-[34.8px] text-[#ea4235] mt-5">
              GDSC BABCOCK WRAPPED
            </div>
          </div>
          <div className="relative flex flex-col ml-[114px] gap-20 w-2/3 items-start">
            <div className="flex flex-col gap-10 w-full items-start">
              <div className="text-4xl font-bold leading-[56px] text-[#34a853]">
                The most active track in GDSC Babcock is <br />
                the{" "}
                <span className="font-['Inter'] text-[#ea4235]">
                  {general?.most_active_group.group} Development
                </span>
                <div className="font-['Inter']"> Track!</div>
              </div>
              <div className="text-3xl leading-[42px] text-[#cecece] ml-1 w-full font-['Inter']">
                Under the leadership of{" "}
                <span className="font-bold">Onuada Alfred </span>
                {/* integrate when data is ready */}
                <div>and</div>
                <span className="font-bold"> Falomo Sharon </span>{" "}
                {/* integrate when data is ready */}
                <div>
                  this team has flourished by sparking intellectual discourse
                  and generally impacting the lives of their team members.{" "}
                  <br />
                  <br />
                  Cheers to the Web guys!
                </div>
              </div>
            </div>
            <button
              id="Button1"
              className="bg-[#ea4235] flex flex-row justify-center ml-1 pt-4 gap-3 w-1/3 h-12 cursor-pointer items-start rounded"
            >
              <div
                id="Label"
                className="text-center text-lg leading-[24px] text-white"
              >
                Done
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

async function FetchGeneralData(): Promise<SuccessGeneralResponse> {
  const data = await fetchGeneralData();
  return data;
}
