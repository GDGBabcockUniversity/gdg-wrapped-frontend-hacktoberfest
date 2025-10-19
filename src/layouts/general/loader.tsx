import React from "react";

interface LoaderProps {
	text?: string;
	size?: number;
	color?: string;
}

const Loader: React.FC<LoaderProps> = ({
	text = "Loading...",
	size = 48,
	color = "border-t-blue-500 border-r-green-500 border-b-yellow-500 border-l-red-500", //specified colors for all border sizes
}) => {
	return (
		<div className="flex flex-col items-center justify-center  w-full gap-3 scale-95 mt-2">
			<div
				className={`border-4 border-solid rounded-full animate-spin border-t-transparent ${color}`}
				style={{width: size, height: size}}
			/>
			{/* {text && <p className="text-gray-600 text-lg">{text}</p>} */}
		</div>
	);
};

export default Loader;
