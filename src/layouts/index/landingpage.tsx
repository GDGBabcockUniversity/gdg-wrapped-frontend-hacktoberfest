import Image from "next/image";
import React, {useEffect, useState} from "react";
import "react-toastify/dist/ReactToastify.css";

import PrimaryButton from "@/components/PrimaryButton"; // Component is already imported

import Loader from "../general/loader";
type LandingPageProps = {
	style?: React.CSSProperties;
	phoneNumber: string;
	setPhoneNumber: (value: string) => void;
	handleSubmit: (e: React.FormEvent) => void;
	handleLoader: boolean;
};

const LandingPage: React.FC<LandingPageProps> = ({
	style,
	phoneNumber: phoneNumberProp,
	setPhoneNumber: setPhoneNumberProp,
	handleSubmit: handleSubmitProp,
	handleLoader: load,
}) => {
	const [phoneNumber, setPhoneNumber] = useState<string>(phoneNumberProp);
	// const [load, setLoad] = useState<boolean>(false);
	const handleSetPhoneNumber = (number: string) => {
		setPhoneNumber(number);
	};
	// const handleButtonClick = () => {
	// 	setLoad(true);
	// 	handleSubmitProp();
	// 	setLoad(false);
	// };
	useEffect(() => {
		setPhoneNumberProp(phoneNumber);
	}, [phoneNumber]);
	return (
		<div
			className="bg-black flex flex-col justify-center items-center px-16 py-12 max-md:px-5"
			style={style}>
			<div className="w-full max-w-[1157px] mt-5 mb-56 max-md:max-w-full max-md:mb-10">
				<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
					<div className="flex flex-col items-stretch w-[65%] max-md:w-full max-md:ml-0">
						<div className="flex grow flex-col max-md:max-w-full max-md:mt-10">
							<Image
								src="/logo.png"
								alt="GDS Logo"
								width={655}
								height={100}
							/>
							<div className="text-white text-5xl font-bold self-stretch mt-32 max-md:max-w-full max-md:text-4xl max-md:mt-10">
								<span className="font-medium">
									Please type in your WhatsApp phone number to
									view your personalized{" "}
								</span>
								<span className="font-medium text-blue-500">
									GDG{" "}
								</span>
								<span className="font-medium text-red-500">
									on{" "}
								</span>
								<span className="font-medium text-yellow-500">
									Campus{" "}
								</span>
								<span className="font-medium text-green-600">
									Babcock{" "}
								</span>
								<span className="font-medium">
									Wrapped.
								</span>
							</div>
							<div className="md:hidden flex flex-col items-stretch w-[35%] ml-5 max-md:w-full max-md:ml-0">
								<Image
									alt="Woman Vector"
									width={500}
									height={500}
									src="/woman.svg"
									className="aspect-[0.93] object-contain object-center w-full overflow-hidden grow mt-56 max-md:mt-10"
								/>
							</div>
							<div className="text-white text-xl leading-6 self-stretch mt-20 max-md:max-w-full max-md:mt-10">
								Input your whatsapp Number
							</div>
							<input
								type="text"
								className="text-neutral-600 text-base leading-6 whitespace-nowrap justify-center rounded border border-[color:var(--Primary-M\_Blue,#0671E0)] bg-blue-50 self-stretch mt-3.5 pl-5 pr-16 py-5 border-solid items-start max-md:max-w-full max-md:pr-5"
								placeholder="+234 000 0000 000"
								onChange={(e) =>
									handleSetPhoneNumber(e.target.value)
								}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										handleSubmitProp(e as any);
									}
								}}></input>
						</div>
					</div>
					<div className="hidden md:flex md:flex-col md:items-stretch w-[35%] ml-5 max-md:w-full max-md:ml-0">
						<Image
							alt="Woman Vector"
							width={500}
							height={500}
							src="/woman.svg"
							className="aspect-[1] object-contain object-center w-full overflow-hidden grow mt-56 max-md:mt-10"
						/>
					</div>
				</div>
				<button
					id="LandingPage_NextButton"
					disabled={load}
					className="bg-[#4286f5] disabled:bg-transparent md:w-1/3 h-12 cursor-pointer disabled:cursor-not-allowed font-sans rounded w-full mt-2 md:mt-0"
					onClick={handleSubmitProp}>
					<div
						id="Label"
						className="text-center text-lg leading-[24px] text-white">
						{load ? <Loader /> : "Next"}
					</div>
				</button>
			</div>
		</div>
	);
};

export default LandingPage;