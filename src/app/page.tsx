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
	const [memberData, setMemberData] = useState<DataMember | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [step, setStep] = useState<number>(1);
	const [error, setError] = useState<string | null>(null);

	const totalSteps = 8; // Define the total number of steps
	const [currentStep, setCurrentStep] = useState<number>(0); // State to track the current step
	
	// Loading states for different sections
	const [isDoneForResource, setIsDoneForResource] = useState<boolean>(false);
	const [isDoneForQuestion, setIsDoneForQuestion] = useState<boolean>(false);
	const [isDoneForMessages, setIsDoneForMessages] = useState<boolean>(false);
	const [isDoneForMessagesImpact, setIsDoneForMessagesImpact] = useState<boolean>(false);

	// Function to simulate changing the current step
	const goToNextStep = () => {
		setCurrentStep((prevStep) => (prevStep + 1) % totalSteps);
	};

	useEffect(() => {
		goToNextStep();
	}, [step]);

	// Phone number validation function
	const validatePhoneNumber = (phone: string): boolean => {
		// Remove all non-digit characters for validation
		const cleanPhone = phone.replace(/\D/g, "");

		// Check if phone number is valid (10-15 digits)
		if (cleanPhone.length < 10 || cleanPhone.length > 15) {
			return false;
		}

		return true;
	};

	// Handle member fetch with proper error handling
	const handleFetchMember = async () => {
		try {
			// Reset error state
			setError(null);

			// Validate phone number before making request
			if (!validatePhoneNumber(phoneNumber)) {
				console.error(
					"[VALIDATION ERROR] Invalid phone number format:",
					phoneNumber,
				);
				setError(
					"Invalid phone number. Please enter a valid phone number (10-15 digits).",
				);

				// Reset loading state and step on validation error
				setIsLoading(false);
				setStep(1);

				// Add testable guard - log for verification
				console.log(
					"[GUARD EXECUTED] Loading state reset to false, step reset to 1",
				);
				return;
			}

			// Set loading state
			setIsLoading(true);
			console.log("[FETCH START] Fetching member data for:", phoneNumber);

			// Make API request
			const response = await fetch(`/api/member/${phoneNumber}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			// Check if response is ok
			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(
					errorData.message ||
						`Failed to fetch member data: ${response.status} ${response.statusText}`,
				);
			}

			// Parse response data
			const data = await response.json();

			// Validate response data
			if (!data || !data.success) {
				throw new Error(data?.message || "Member not found or invalid response");
			}

			// Success - update member data and proceed to step 2
			console.log("[FETCH SUCCESS] Member data retrieved:", data);
			setMemberData(data.data);
			setStep(2);
			setError(null);
		} catch (err) {
			// Handle fetch errors
			console.error("[FETCH ERROR] Failed to fetch member data:", err);

			const errorMessage =
				err instanceof Error
					? err.message
					: "An unknown error occurred while fetching member data";

			setError(errorMessage);

			// Reset loading state and step on fetch error
			setIsLoading(false);
			setStep(1);

			// Add testable guard - log for verification
			console.log(
				"[GUARD EXECUTED] Loading state reset to false, step reset to 1 after error",
			);
			console.log("[ERROR DETAILS]", {
				phoneNumber,
				errorMessage,
				timestamp: new Date().toISOString(),
			});

			// Optional: Show toast notification
			// toast.error(errorMessage);
		} finally {
			// Ensure loading state is always reset
			setIsLoading(false);
			console.log("[FETCH COMPLETE] Loading state set to false");
		}
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Trim phone number
		const trimmedPhone = phoneNumber.trim();

		if (!trimmedPhone) {
			setError("Please enter a phone number");
			return;
		}

		setPhoneNumber(trimmedPhone);
		handleFetchMember();
	};

	// Handle retry
	const handleRetry = () => {
		setError(null);
		setStep(1);
		setIsLoading(false);
		setMemberData(null);
		setPhoneNumber("");
		console.log("[RETRY] State reset for new attempt");
	};

	return (
		<>
			{step > 1 && (
				<StoryBar steps={totalSteps} currentPosition={step - 1} />
			)}
			<ToastContainer />

			{isLoading && step === 2 && error === "200" && (
				<SitTight isDone={true} setIsDone={() => {}} />
			)}

			{step === 2 && error === "404" && <NotFound />}

			{step === 2 && error === "500" && <ServerError />}

			{!isLoading && step === 1 && (
				<LandingPage
					phoneNumber={phoneNumber}
					setPhoneNumber={setPhoneNumber}
					handleSubmit={handleSubmit}
					handleLoader={isLoading}
				/>
			)}
			{memberData?.peak_hour && step === 3 && (
				<DawnPatrol
					hour={memberData?.peak_hour}
					setHour={() => console.log()}
					isbuttonVisible={true}
					hanldeNext={() => setStep(4)}
				/>
			)}
			{memberData?.messages_top_perc && step === 4 && (
				<>
					{!isDoneForResource && (
						<LoadingResource
							isDone={isDoneForResource}
							setIsDone={setIsDoneForResource}
						/>
					)}
					{isDoneForResource && (
						<EsteemedObserver
							resourcePerc={memberData?.resources_top_perc}
							isbuttonVisible={true}
							handleNext={() => setStep(5)}
						/>
					)}
				</>
			)}

			{memberData?.questions_top_perc && step === 5 && (
				<>
					{!isDoneForQuestion && (
						<LoadingQuestionPercentile
							isDone={isDoneForQuestion}
							setIsDone={setIsDoneForQuestion}
						/>
					)}
					{isDoneForQuestion && (
						<QuestionPercentile
							question={memberData?.questions_top_perc}
							isbuttonVisible={true}
							handleNext={() => setStep(6)}
						/>
					)}
				</>
			)}
			{memberData?.messages_top_perc && step === 6 && (
				<>
					{!isDoneForMessages && (
						<LoadingMessages
							isDone={isDoneForMessages}
							setIsDone={setIsDoneForMessages}
						/>
					)}
					{isDoneForMessages && (
						<MessagesPerc
							messages={memberData?.messages_top_perc}
							isbuttonVisible={true}
							handleNext={() => setStep(7)}
						/>
					)}
				</>
			)}
			{memberData?.message_impact_top_perc && step === 7 && (
				<>
					{!isDoneForMessagesImpact && (
						<LoadingMessagesImpact
							isDone={isDoneForMessagesImpact}
							setIsDone={setIsDoneForMessagesImpact}
						/>
					)}
					{isDoneForMessagesImpact && (
						<MessagesImpact
							messageimpact={memberData?.message_impact_top_perc}
							isbuttonVisible={true}
							handleNext={() => setStep(8)}
						/>
					)}
				</>
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
