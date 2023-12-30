"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import { Console } from "console";
import LoadingResource from "@/layouts/index/resourcecontributors/loading";
import EsteemedObserver from "@/layouts/index/resourcecontributors/esteemedobserver";
import LoadingQuestionPercentile from "@/layouts/index/questionpercentile/loading";
import QuestionPercentile from "@/layouts/index/questionpercentile/questionpercentile";
import LoadingMessages from "@/layouts/index/messagesperc/loading";
import MessagesPerc from "@/layouts/index/messagesperc/messagesperc";
import LoadingMessagesImpact from "@/layouts/index/messagesimpact/loading";
import MessagesImpact from "@/layouts/index/messagesimpact/messagesimpact";
import SharePage from "@/layouts/index/share/share";
import Head from "next/head";
import { saveToLocalStorage } from "@/utilities/localstorage";

export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isDoneForMessages, setIsDoneForMessages] = useState<boolean>(false);
  const [isDoneForMessagesImpact, setIsDoneForMessagesImpact] =
    useState<boolean>(false);
  const [isDoneForResource, setIsDoneForResource] = useState<boolean>(false);
  const [isDoneForQuestion, setIsDoneForQuestion] = useState<boolean>(false);

  const [step, setStep] = useState<number>(1);
  const [member, setMember] = useState<DataMember>();
  // const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
  //   null
  // );
  // const [chunks, setChunks] = useState<BlobPart[]>([]);

  // const startRecording = () => {
  //   navigator.mediaDevices
  //     .getDisplayMedia({ video: true })
  //     .then((stream) => {
  //       const recorder = new MediaRecorder(stream);
  //       recorder.ondataavailable = (e) => {
  //         setChunks((currentChunks) => [...currentChunks, e.data]);
  //       };
  //       recorder.start();
  //       setMediaRecorder(recorder);
  //     })
  //     .catch((err) => {
  //       console.error("Error during getDisplayMedia()", err);
  //     });
  // };

  // const stopRecording = () => {
  //   mediaRecorder?.stop();
  //   mediaRecorder!.onstop = () => {
  //     const blob = new Blob(chunks, { type: "video/mp4" });
  //     setChunks([]);
  //     const videoURL = window.URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = videoURL;
  //     a.download = "recording.mp4";
  //     a.click();
  //     window.URL.revokeObjectURL(videoURL);
  //   };
  // };
  async function fetchData() {
    if (phoneNumber.length < 11) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setStep(2);
    setIsLoading(true);
    saveToLocalStorage("number", phoneNumber);
    const response = await fetchMemberDataInfo(phoneNumber);

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

      {isLoading && step === 2 && (
        <SitTight isDone={isDone} setIsDone={setIsDone} />
      )}
      {!isLoading && step === 1 && (
        <LandingPage
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          handleSubmit={fetchData}
        />
      )}
      {member?.peak_hour && step === 3 && (
        <DawnPatrol
          hour={member?.peak_hour}
          setHour={() => console.log()}
          isbuttonVisible={true}
          hanldeNext={() => setStep(4)}
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
          isbuttonVisible={true}
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
          isbuttonVisible={true}
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
          isbuttonVisible={true}
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
            isbuttonVisible={true}
            handleNext={() => setStep(8)}
          />
        )}
      {step === 8 && <SharePage />}
    </>
  );
}

async function fetchMemberDataInfo(
  phoneNumber: string
): Promise<SuccessMemberResponse> {
  const data = await fetchMemberData(phoneNumber);
  return data;
}
