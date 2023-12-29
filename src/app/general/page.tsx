"use client";
import LoadingGeneral from "@/layouts/general/loading";
import { fetchGeneralData } from "@/services/general.handler";
import {
  Data,
  SuccessGeneralResponse,
} from "@/types/general.types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function General() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [general, setGeneral] = useState<Data>();

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

      {isDone && (
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
                      <div key={member.phone_number}>
                        {member.phone_number} - {member.group_chat}
                        <br />
                      </div>
                    ))}
                </div>
                <div className="text-2xl leading-[33.6px] text-[#cecece] mb-2">
                  {general?.most_active_members_per_track
                    .slice(7)
                    .map((member) => (
                      <div key={member.phone_number}>
                        {member.phone_number} - {member.group_chat}
                        <br />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <button
              id="Button1"
              className="bg-[#ea4235] flex flex-row justify-center pt-4 gap-3 w-1/3 h-12 cursor-pointer items-start rounded"
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
    </>
  );
}

async function FetchGeneralData(): Promise<
  SuccessGeneralResponse 
> {
  const data = await fetchGeneralData();
  return data;
}
