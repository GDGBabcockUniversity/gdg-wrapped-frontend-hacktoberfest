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
import General from "@/components/General";
import LoadingGeneral from "@/layouts/general/loading";

export default function Home() {
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [memberData, setMemberData] = useState<DataMember | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [step, setStep] = useState<number>(1);
	const [error, setError] = useState<string | null>(null);

	// Complete step structure with all loaders as separate pages:
	// 1: Landing, 2: Error, 3: Peak Hour
	// 4: LoaderResource, 5: Resource (EsteemedObserver)
	// 6: LoaderQuestion, 7: Question (QuestionPercentile)
	// 8: LoaderMessages, 9: Messages (MessagesPerc)
	// 10: LoaderImpact, 11: Impact (MessagesImpact)
	// 12: LoaderGeneral, 13-16: General (4 sub-pages)
	const totalSteps = 16;
	const [currentStep, setCurrentStep] = useState<number>(0); // State to track the current step

	// Auto-advance timer state (timer hidden from UI but still functional)
	const [isPaused, setIsPaused] = useState<boolean>(false);
	const [progressPercent, setProgressPercent] = useState<number>(0); // 0-100% for smooth animation

	// Touch detection for swipe navigation
	const [touchStartX, setTouchStartX] = useState<number>(0);
	const [touchEndX, setTouchEndX] = useState<number>(0);

	// Function to simulate changing the current step
	const goToNextStep = () => {
		setCurrentStep((prevStep) => (prevStep + 1) % totalSteps);
	};

	useEffect(() => {
		goToNextStep();
	}, [step]);

	// Auto-advance timer effect (10 seconds per page with smooth 60fps animation)
	useEffect(() => {
		// Don't auto-advance on landing (1) or error (2) pages
		if (step <= 2 || isLoading || isPaused) {
			setProgressPercent(0);
			return;
		}

		const duration = 10000; // 10 seconds in milliseconds
		const startTime = Date.now();

		const timer = setInterval(() => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min((elapsed / duration) * 100, 100);
			
			setProgressPercent(progress);

			if (elapsed >= duration) {
				// Auto-advance to next step (don't advance past step 16)
				if (step < 16) {
					setStep(step + 1);
				}
			}
		}, 16); // ~60fps for smooth animation

		return () => clearInterval(timer);
	}, [step, isPaused, isLoading]);

	// Reset progress when step changes
	useEffect(() => {
		setProgressPercent(0);
	}, [step]);

	// Navigation functions
	const handleNext = () => {
		if (step === 1 || step === 2) return; // Don't navigate from landing or error pages

		if (step < 16) {
			setStep(step + 1);
		}
	};

	const handlePrevious = () => {
		if (step === 1 || step === 2) return; // Don't navigate from landing or error pages

		// Go back one step at a time - ALL pages including loaders
		if (step > 3) {
			setStep(step - 1);
		}
	};

	// Jump to a specific step (for progress bar clicks)
	const jumpToStep = (targetStep: number) => {
		if (targetStep <= 2) return; // Don't allow jumping to landing or error pages

		setStep(targetStep);
	};

	// Touch event handlers for swipe navigation
	const onTouchStart = (e: React.TouchEvent) => {
		setTouchStartX(e.touches[0].clientX);
	};

	const onTouchMove = (e: React.TouchEvent) => {
		setTouchEndX(e.touches[0].clientX);
	};

	const onTouchEnd = () => {
		if (!touchStartX || !touchEndX) return;
		
		const distance = touchStartX - touchEndX;
		const isLeftSwipe = distance > 50;
		const isRightSwipe = distance < -50;

		if (isLeftSwipe) {
			handleNext();
		}
		if (isRightSwipe) {
			handlePrevious();
		}

		// Reset touch positions
		setTouchStartX(0);
		setTouchEndX(0);
	};

	// Keyboard event handler for arrow keys
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			if (e.key === "ArrowRight") {
				handleNext();
			} else if (e.key === "ArrowLeft") {
				handlePrevious();
			}
		};

		window.addEventListener("keydown", handleKeyPress);
		return () => window.removeEventListener("keydown", handleKeyPress);
	}, [step, handleNext, handlePrevious]);

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

			// Make API request using the existing handler
			const data = await fetchMemberData(phoneNumber);

			// Validate response data
			if (!data || !data.success || !data.data) {
				throw new Error(data?.error || "Member not found or invalid response");
			}

			// Success - update member data and proceed to step 3 (first content screen)
			console.log("[FETCH SUCCESS] Member data retrieved:", data);
			setMemberData(data.data);
			setStep(3);
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
		<div
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
			className="relative w-full min-h-screen"
		>
		{step > 2 && (
			<StoryBar 
				steps={14} 
				currentPosition={step - 3}
				onSegmentClick={(targetStep) => jumpToStep(targetStep + 2)}
				progressPercent={progressPercent}
			/>
		)}
		
		{/* Navigation Buttons for Desktop */}
		{step > 2 && (
			<>
				{/* Left Navigation Button */}
				{step > 3 && (
					<button
						onClick={handlePrevious}
						className="fixed left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hidden md:block"
						aria-label="Previous page"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</button>
				)}
				
				{/* Right Navigation Button */}
				{step < 16 && (
					<button
						onClick={handleNext}
						className="fixed right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110 hidden md:block"
						aria-label="Next page"
					>
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</button>
				)}
			</>
		)}			<ToastContainer />

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
			{/* Step 3: Peak Hour */}
			{memberData?.peak_hour && step === 3 && (
				<DawnPatrol
					hour={memberData?.peak_hour}
					setHour={() => console.log()}
					isbuttonVisible={false}
					hanldeNext={() => setStep(4)}
				/>
			)}

			{/* Step 4: Loader for Resource */}
			{step === 4 && <LoadingResource isDone={false} setIsDone={() => {}} />}

			{/* Step 5: Resource (EsteemedObserver) */}
			{memberData?.resources_top_perc && step === 5 && (
				<EsteemedObserver
					resourcePerc={memberData?.resources_top_perc}
					isbuttonVisible={false}
					handleNext={() => setStep(6)}
				/>
			)}

			{/* Step 6: Loader for Question */}
			{step === 6 && <LoadingQuestionPercentile isDone={false} setIsDone={() => {}} />}

			{/* Step 7: Question Percentile */}
			{memberData?.questions_top_perc && step === 7 && (
				<QuestionPercentile
					question={memberData?.questions_top_perc}
					isbuttonVisible={false}
					handleNext={() => setStep(8)}
				/>
			)}

			{/* Step 8: Loader for Messages */}
			{step === 8 && <LoadingMessages isDone={false} setIsDone={() => {}} />}

			{/* Step 9: Messages Percentile */}
			{memberData?.messages_top_perc && step === 9 && (
				<MessagesPerc
					messages={memberData?.messages_top_perc}
					isbuttonVisible={false}
					handleNext={() => setStep(10)}
				/>
			)}

			{/* Step 10: Loader for Impact */}
			{step === 10 && <LoadingMessagesImpact isDone={false} setIsDone={() => {}} />}

			{/* Step 11: Messages Impact */}
			{memberData?.message_impact_top_perc && step === 11 && (
				<MessagesImpact
					messageimpact={memberData?.message_impact_top_perc}
					isbuttonVisible={false}
					handleNext={() => setStep(12)}
				/>
			)}

			{/* Step 12: Loader for General */}
			{step === 12 && <LoadingGeneral isDone={false} setIsDone={() => {}} />}

			{/* Steps 13-16: General (4 separate pages) */}
			{step === 13 && <General step={1} />}
			{step === 14 && <General step={2} />}
			{step === 15 && <General step={3} />}
			{step === 16 && <General step={4} />}
		</div>
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
