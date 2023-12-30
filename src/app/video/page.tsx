"use client";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import {
  Data,
  DataMember,
  SuccessGeneralResponse,
  SuccessMemberResponse,
} from "@/types/general.types";
import { fetchGeneralData, fetchMemberData } from "@/services/general.handler";
import LandingPage from "@/layouts/index/landingpage";
import SitTight from "@/layouts/index/sittight";
import DawnPatrol from "@/layouts/index/peakhours/dawnpatrol";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingResource from "@/layouts/index/resourcecontributors/loading";
import EsteemedObserver from "@/layouts/index/resourcecontributors/esteemedobserver";
import LoadingQuestionPercentile from "@/layouts/index/questionpercentile/loading";
import QuestionPercentile from "@/layouts/index/questionpercentile/questionpercentile";
import LoadingMessages from "@/layouts/index/messagesperc/loading";
import MessagesPerc from "@/layouts/index/messagesperc/messagesperc";
import LoadingMessagesImpact from "@/layouts/index/messagesimpact/loading";
import MessagesImpact from "@/layouts/index/messagesimpact/messagesimpact";
import SharePage from "@/layouts/index/share/share";
import { useRouter, useSearchParams } from "next/navigation";
import { formatPhoneNumber } from "@/utilities/utils";

const VideoPage: React.FC = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isDoneForMessages, setIsDoneForMessages] = useState<boolean>(false);
  const [isDoneForMessagesImpact, setIsDoneForMessagesImpact] =
    useState<boolean>(false);
  const [isDoneForResource, setIsDoneForResource] = useState<boolean>(false);
  const [isDoneForQuestion, setIsDoneForQuestion] = useState<boolean>(false);
  const hasRun = useRef(false);
  const [step, setStep] = useState<number>(2);
  const [member, setMember] = useState<DataMember>();
  const searchParams = useSearchParams();
  var someQueryParam = searchParams.get("number");
  someQueryParam = formatPhoneNumber(someQueryParam?.toString()!);

  // useEffect(() => {
  //   if (someQueryParam && !hasRun.current) {
  //     hasRun.current = true;
  //     fetchData(someQueryParam);
  //     setTimeout(() => {
  //       setStep(4);
  //     }, 10000);
  //     setTimeout(() => {
  //       setStep(5);
  //     }, 20000);
  //     setTimeout(() => {
  //       setStep(6);
  //     }, 2000);
  //     setTimeout(() => {
  //       setStep(7);
  //     }, 48000);
  //     setTimeout(() => {
  //       setStep(8);
  //     }, 96000);
  //   }
  // }, [someQueryParam, fetchData]);
  useEffect(() => {
    if (step === 2) {
      fetchData(someQueryParam!);
      setTimeout(() => {}, 2000);
    }
    const intervalId = setInterval(() => {
      if (step < 8) {
        setStep((prevStep) => prevStep + 1);
      } else {
        clearInterval(intervalId);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [step]);

  async function fetchData(numbers: string) {
    if (numbers.length < 11) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setStep(2);
    setIsLoading(true);
    const response = await fetchMemberDataInfo(numbers);

    if (!response.success) {
      toast.error((response as SuccessMemberResponse).error);
      return;
    } else {
      setTimeout(() => {
        setIsLoading(false);
        setIsDone(true);
        setStep(3);
      }, 5000);
      setMember((response as SuccessMemberResponse).data);
    }
  }

  return (
    <>
      <ToastContainer />
      {!isLoading && step === 1 && (
        <LandingPage
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          handleSubmit={() => fetchData(phoneNumber)}
          style={isLoading ? { display: "hi" } : { display: "block" }}
        />
      )}
      {isLoading && step === 2 && (
        <SitTight
          style={
            isLoading
              ? {
                  display: "block",
                }
              : { display: "none" }
          }
          isDone={isDone}
          setIsDone={setIsDone}
        />
      )}
      {member?.peak_hour && member.peak_hour >= 19 && step === 3 && (
        <DawnPatrol
          hour={member?.peak_hour}
          setHour={() => console.log("hey")}
          hanldeNext={() => setStep(4)}
          isbuttonVisible={false}
        />
      )}
      {member?.messages_top_perc && !isDoneForResource && step === 4 && (
        <LoadingResource
          isDone={isDoneForResource}
          setIsDone={setIsDoneForResource}
        />
      )}
      {member?.messages_top_perc && isDoneForResource && step === 4 && (
        <EsteemedObserver
          resourcePerc={member?.resources_top_perc}
          isbuttonVisible={false}
          handleNext={() => setStep(5)}
        />
      )}

      {member?.questions_top_perc && !isDoneForQuestion && step === 5 && (
        <LoadingQuestionPercentile
          isDone={isDoneForQuestion}
          setIsDone={setIsDoneForQuestion}
        />
      )}

      {member?.questions_top_perc && isDoneForQuestion && step === 5 && (
        <QuestionPercentile
          question={member?.questions_top_perc}
          isbuttonVisible={false}
          handleNext={() => setStep(6)}
        />
      )}
      {member?.messages_top_perc && step === 6 && !isDoneForMessages && (
        <LoadingMessages
          isDone={isDoneForMessages}
          setIsDone={setIsDoneForMessages}
        />
      )}
      {member?.messages_top_perc && step === 6 && isDoneForMessages && (
        <MessagesPerc
          messages={member?.messages_top_perc}
          isbuttonVisible={false}
          handleNext={() => setStep(7)}
        />
      )}
      {member?.message_impact_top_perc &&
        !isDoneForMessagesImpact &&
        step === 7 && (
          <LoadingMessagesImpact
            isDone={isDoneForMessagesImpact}
            setIsDone={setIsDoneForMessagesImpact}
          />
        )}
      {member?.message_impact_top_perc &&
        isDoneForMessagesImpact &&
        step === 7 && (
          <MessagesImpact
            messageimpact={member?.message_impact_top_perc}
            isbuttonVisible={false}
            handleNext={() => setStep(8)}
          />
        )}
      {step === 8 && <SharePage />}
    </>
  );
};

async function fetchMemberDataInfo(
  phoneNumber: string
): Promise<SuccessMemberResponse> {
  const data = await fetchMemberData(phoneNumber);
  return data;
}

export default VideoPage;
