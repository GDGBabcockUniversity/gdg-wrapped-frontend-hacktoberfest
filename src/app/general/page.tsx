"use client";
import SharePage from "@/layouts/index/share/share";
import {fetchGeneralData} from "@/services/general.handler";
import {Data, SuccessGeneralResponse} from "@/types/general.types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface GeneralProps {
	step?: number; // Current sub-step (1-4) from parent
}

export default function General({ step = 1 }: GeneralProps) {
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
			{step === 1 && (
				<div
					id="GeneralRoot"
					className="bg-black relative flex flex-col justify-between gap-35 md:gap-48 w-full font-sans items-start pt-12 md:pb-[245px] md:px-32">
					<Image
						src="/topprogress.svg"
						alt="Vector"
						width={1269}
						height={181}
						loading="eager"
						className="md:w-[1269px] w-[90%] h-10 origin-top-left rotate-[-0.16deg] absolute top-[10rem] md:top-48 left-[5%] md:left-24"
					/>
					<div className="relative flex flex-col md:flex-row justify-between ml-4 w-full items-start gap-4 md:gap-0">
						<Image
							src="/logo.png"
							alt="GDGBabcockUniversityHorizontalWhite"
							width={655}
							height={100}
							className="w-full md:w-auto max-w-[655px]"
						/>
						<div className="text-xl md:text-3xl font-black leading-[34.8px] text-[#ea4235] md:mt-5">
							GENERAL GDG <span className="md:hidden"> </span>
							<br className="hidden md:block" />
							BABCOCK WRAPPED
						</div>
					</div>
					<div className="relative flex flex-col justify-between ml-8 gap-[60px] md:gap-[117px] md:w-3/4 mt-[20px] md:mt-0 items-start">
						<div className="flex flex-col gap-2 w-full items-start mt-10">
							<div className="text-2xl md:text-4xl font-bold md:leading-[56px] text-[#34a853]">
								Most active GDG on Campus Babcock members
							</div>
							<div className="md:flex flex-row ml-px gap-24 w-full items-start">
								<div className="text-lg md:text-2xl md:leading-[33.6px] text-[#cecece] ">
									{general?.most_active_members
										.slice(0, 6)
										.map((member) => (
											<div key={member.name}>
												• {member.name}
												<br />
											</div>
										))}
								</div>
								<div className="text-lg md:text-2xl md:leading-[33.6px] text-[#cecece] mb-2">
									{general?.most_active_members
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
					</div>
				</div>
			)}
			{step === 2 && (
				<div
					id="GeneralRoot"
					className="bg-black relative flex flex-col justify-between gap-[5rem] md:gap-48 w-full font-sans items-start pt-12 md:pb-[245px] md:px-32">
					<Image
						src="/topprogress.svg"
						alt="Vector"
						width={1269}
						height={181}
						className="md:w-[1269px] w-[90%] h-10 origin-top-left rotate-[-0.16deg] absolute top-[10rem] md:top-48 left-[5%] md:left-24"
					/>
					<div className="relative flex flex-col md:flex-row justify-between ml-4 w-full items-start gap-4 md:gap-0">
						<Image
							src="/logo.png"
							alt="GDGBabcockUniversityHorizontalWhite"
							width={655}
							height={100}
							className="w-full md:w-auto max-w-[655px]"
						/>
						<div className="text-xl md:text-3xl font-black leading-[34.8px] text-[#ea4235] md:mt-5">
							GENERAL GDG <span className="md:hidden"> </span>
							<br className="hidden md:block" />
							BABCOCK WRAPPED
						</div>
					</div>
					<div className="relative flex flex-col justify-between ml-8 gap-[60px] md:gap-[117px] w-3/4 items-start">
						<div className="flex flex-col gap-2 w-full items-start">
							<div className="text-2xl md:text-4xl font-bold md:leading-[56px] text-[#34a853]">
								Most active members per group
							</div>
							<div className="md:flex flex-row ml-px gap-24 w-full items-start">
								<div className="text-lg md:text-2xl md:leading-[33.6px] text-[#cecece] ">
									{general?.most_active_members_per_track
										.slice(0, 6)
										.map((member) => (
											<div key={member.name}>
												• {member.name} -{" "}
												{member.group_chat}
												<br />
											</div>
										))}
								</div>
								<div className="text-lg md:text-2xl md:leading-[33.6px] text-[#cecece] mb-2">
									{general?.most_active_members_per_track
										.slice(7)
										.map((member) => (
											<div key={member.name}>
												• {member.name} -{" "}
												{member.group_chat}
												<br />
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{step === 3 && (
				<div
					id="GeneralRoot"
					className="bg-black h-full relative flex flex-col justify-between gap-[100px] md:gap-[146px] w-full font-sans items-start pt-12 md:pb-[237px] md:px-20">
					<Image
						src="/topprogress.svg"
						alt="Vector"
						width={1269}
						height={181}
						className="md:w-[1269px] w-[90%] h-10 origin-top-left rotate-[-0.16deg] absolute top-[10rem] md:top-48 left-[5%] md:left-24"
					/>
					<div className="relative flex flex-col md:flex-row justify-between ml-4 md:ml-12 w-full items-start gap-4 md:gap-0">
						<Image
							src="/logo.png"
							alt="GDGBabcockUniversityHorizontalWhite"
							width={655}
							height={100}
							className="w-full md:w-auto max-w-[655px]"
						/>
						<div className="text-xl md:text-3xl font-black leading-[34.8px] text-[#ea4235] md:mt-5">
							GDG on Campus Babcock WRAPPED
						</div>
					</div>
					<div className="relative flex flex-col ml-[20px] md:ml-[114px] gap-20 md:w-2/3 items-start">
						<div className="flex flex-col gap-10 w-full items-start">
							<div className="text-xl md:text-4xl font-bold md:leading-[56px] text-[#34a853]">
								The most active track in GDG on Campus Babcock is{" "}
								<br className="hidden md:block" />
								the{" "}
								<span className="font-sans text-[#ea4235]">
									{general?.most_active_group.group}{" "}
									Development
								</span>
								<div className="font-sans"> Track!</div>
							</div>
							<div className="text-lg md:text-3xl leading-[42px] text-[#cecece] ml-1 w-full font-sans">
								Under the leadership of{" "}
								<span className="font-bold">
									Onuada Alfred{" "}
								</span>
								{/* integrate when data is ready */}
								<div>and</div>
								<span className="font-bold">
									{" "}
									Falomo Sharon{" "}
								</span>{" "}
								{/* integrate when data is ready */}
								<div>
									this team has flourished by sparking
									intellectual discourse and generally
									impacting the lives of their team members.{" "}
									<br />
									<br />
									Cheers to the Web guys!
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{step === 4 && <SharePage />}
		</>
	);
}
async function FetchGeneralData(): Promise<SuccessGeneralResponse> {
	const data = await fetchGeneralData();
	return data;
}
