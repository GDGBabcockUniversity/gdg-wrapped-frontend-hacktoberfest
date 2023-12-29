"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Data, DataMember, ErrorGeneralResponse, SuccessGeneralResponse, SuccessMemberResponse } from "@/types/general.types";
import { fetchGeneralData, fetchMemberData } from "@/services/general.handler";
import LandingPage from "@/layouts/index/landingpage";
import SitTight from "@/layouts/index/sittight";
import DawnPatrol from "@/layouts/index/peakhours/dawnpatrol";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [member, setMember] = useState<DataMember>();
 
 
    async function fetchData() {
      setStep(2);
      setIsLoading(true);
      const response = await fetchMemberDataInfo(phoneNumber)
      console.log(response)

      if (!response.success){
        alert((response as ErrorGeneralResponse).error)
        return;
      }else{
        setTimeout(() => {setIsLoading(false); setIsDone(true); setStep(3)}, 6000);
        setMember((response as SuccessMemberResponse).data);
      }
    }
  
  return (
    <>
      {!isLoading  && step ==1 && (
        <LandingPage
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          handleSubmit={fetchData}
          style={isLoading ? { display: "none" } : { display: "block" }}
        />
      )}
      {isLoading &&  step == 2 &&(
        <SitTight
          style={isLoading ? { display: "block" } : { display: "none" }}
          isDone={isDone}
          setIsDone={setIsDone}
        />
      )}
      {member?.peak_hour! > 19  && step == 3 &&(<DawnPatrol />)}
      {phoneNumber}
    </>
  );
}

async function fetchMemberDataInfo(phoneNumber : string): Promise<
  SuccessMemberResponse | ErrorGeneralResponse
> {
  const data =  await fetchMemberData(phoneNumber)
  return data;
}
