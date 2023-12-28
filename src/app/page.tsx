"use client";
import Image from "next/image";
import { useState } from "react";
import { Data, SuccessGeneralResponse } from "@/types/general.types";
import { fetchGeneralData } from "@/services/general.handler";
import LandingPage from "@/layouts/index/landingpage";
import SitTight from "@/layouts/index/sittight";

export default function Home() {
  const [general, setGeneral] = useState<Data>();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  console.log(phoneNumber);
  const fetchGeneral = async () => {
    setIsLoading(true),
      await fetchGeneralData()
        .then((data) => setGeneral((data as SuccessGeneralResponse).data))
        .finally();
  };
  return (
    <>
      <LandingPage
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        handleSubmit={fetchGeneral}
        style={isLoading ? { display: "none" } : { display: "block" }}
      />
      <SitTight
        style={isLoading ? { display: "block" } : { display: "none" }}
        isDone={isDone}
        setIsDone={setIsDone}
      />
    </>
  );
}
