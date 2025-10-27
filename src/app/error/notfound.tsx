// app/not-found.js

import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";

type NotFoundProps = {
	style?: React.CSSProperties;
};
const NotFound: React.FC<NotFoundProps> = ({style}) => {
	const [progress, setProgress] = useState(0);
	const [isDone, setIsDone] = useState(false);

	return (
		<div
			className="bg-black flex flex-col justify-center items-center px-16 py-12 max-md:px-5 scale-100 opacity-100 transform transition-all duration-1000 ease-in-out"
			style={style}>
			<div className="flex w-full max-w-[1176px] items-stretch gap-1.5 mt-4 mb-56 max-md:max-w-full max-md:flex-wrap max-md:mb-10">
				<div className="flex grow basis-[0%] flex-col items-start max-md:max-w-full">
					<Image
						src="/logo.png"
						alt="GDS Logo"
						width={655}
						height={100}
						className="aspect-[6.62] object-contain object-center w-[655px] overflow-hidden max-w-full"
					/>

					<div className="self-center w-full max-w-[1101px] max-md:max-w-full">
						<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
							<div className="flex flex-col items-stretch w-[62%] max-md:w-full max-md:ml-0">
								<div className="flex flex-col items-stretch my-auto max-md:max-w-full max-md:mt-10">
									<div className="text-white text-5xl font-semibold max-md:max-w-full max-md:text-4xl">
										<span className="text-red-500">
											You&apos;re not a member ke? 😲
										</span>{" "}
										<br />
										<br />
										<br />
										Click{" "}
										<Link
											target="_blank"
											href={
												"https://gdg.community.dev/gdg-on-campus-babcock-university-ilishan-remo-nigeria/"
											}
											className="text-bold bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 bg-clip-text text-transparent animate-gradient">
											here{" "}
										</Link>
										to become a member!.
									</div>
								</div>
							</div>
							<div className="hidden md:flex flex-col items-stretch w-[38%] ml-5 max-md:w-full max-md:ml-0">
								<Image
									src="/woman.svg"
									alt="Woman"
									width={500}
									height={500}
									className="aspect-[0.93] object-contain object-center w-full overflow-hidden grow mt-56 max-md:mt-10 pl-8"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
