"use client";
import LandingPage from "@/layouts/index/landingpage";
import LoadingMessagesImpact from "@/layouts/index/messagesimpact/loading";
import MessagesImpact from "@/layouts/index/messagesimpact/messagesimpact";
import LoadingMessages from "@/layouts/index/messagesperc/loading";
import MessagesPerc from "@/layouts/index/messagesperc/messagesperc";
import DawnPatrol from "@/layouts/index/peakhours/dawnpatrol";
import LoadingQuestionPercentile from "@/layouts/index/questionpercentile/loading";
import QuestionPercentile from "@/layouts/index/questionpercentile/questionpercentile";
import EsteemedObserver from "@/layouts/index/resourcecontributors/esteemedobserver";
import LoadingResource from "@/layouts/index/resourcecontributors/loading";
import SitTight from "@/layouts/index/sittight";
import {fetchGeneralData, fetchMemberData} from "@/services/general.handler";
import {
	DataMember,
	SuccessGeneralResponse,
	SuccessMemberResponse,
} from "@/types/general.types";
import {saveToLocalStorage} from "@/utilities/localstorage";
import {useEffect, useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StoryBar from "./StoryBar";
import NotFound from "./error/notfound";
import ServerError from "./error/servererror";
import General from "./general/page";

export default function Home() {
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isDone, setIsDone] = useState<boolean>(false);
	const [isDoneForMessages, setIsDoneForMessages] = useState<boolean>(false);
	const [isDoneForMessagesImpact, setIsDoneForMessagesImpact] =
		useState<boolean>(false);
	const [isDoneForResource, setIsDoneForResource] = useState<boolean>(false);
	const [isDoneForQuestion, setIsDoneForQuestion] = useState<boolean>(false);
	const [error, setError] = useState<number>(200);

	const [step, setStep] = useState<number>(1);
	const [member, setMember] = useState<DataMember>();
	const totalSteps = 8; // Define the total number of steps
	const [currentStep, setCurrentStep] = useState<number>(0); // State to track the current step

	// Function to simulate changing the current step
	const goToNextStep = () => {
		setCurrentStep((prevStep) => (prevStep + 1) % totalSteps);
	};

	useEffect(() => {
		goToNextStep();
	}, [step]);

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
		if (phoneNumber.length < 10) {
			toast.error("Please enter a valid phone number");
			return;
		}

		setIsLoading(true);
		setStep(2);
		saveToLocalStorage("number", phoneNumber);

		const response = await fetchMemberDataInfo(phoneNumber);

		if (!response.success) {
			toast.error((response as SuccessMemberResponse).error);

			const error = (response as SuccessMemberResponse).error;

			if (error!.includes("404")) {
				setError(404);
			} else {
				setError(500);
			}
			return;
		} else {
			setTimeout(() => {
				setError(200);
				setIsLoading(false);
				setIsDone(true);
				setStep(3);
			}, 5000);

			const sound = document.getElementById("song") as HTMLAudioElement;
			sound.volume = 0.75;
			sound.play();

			setMember((response as SuccessMemberResponse).data);
		}
	}

	return (
		<>
			{step > 1 && (
				<StoryBar steps={totalSteps} currentPosition={step - 1} />
			)}
			<ToastContainer />

			{isLoading && step === 2 && error === 200 && (
				<SitTight isDone={isDone} setIsDone={setIsDone} />
			)}

			{step === 2 && error === 404 && <NotFound />}

			{step === 2 && error === 500 && <ServerError />}

			{!isLoading && step === 1 && (
				<LandingPage
					phoneNumber={phoneNumber}
					setPhoneNumber={setPhoneNumber}
					handleSubmit={fetchData}
					handleLoader={isLoading}
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
			{step === 8 && <General />}
		</>
	);
}

async function fetchMemberDataInfo(
	phoneNumber: string,
): Promise<SuccessMemberResponse> {
	const data = await fetchMemberData(phoneNumber);
	return data;
}

async function FetchGeneralData(): Promise<SuccessGeneralResponse> {
	const data = await fetchGeneralData();
	return data;
}
