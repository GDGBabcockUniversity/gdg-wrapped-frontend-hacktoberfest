import type {Config} from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Google Sans', 'sans-serif'],
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gdsc-gradient":
					"linear-gradient(90deg, rgba(58,93,180,1) 21%, rgba(253,29,29,1) 40%, rgba(251,252,69,1) 65%, rgba(69,252,102,1) 76%)",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			animation: {
				gradient: "gradient 5s ease infinite",
			},
			keyframes: {
				gradient: {
					"0%, 100%": {"background-position": "0% 50%"},
					"50%": {"background-position": "100% 50%"},
				},
			},
		},
	},
	plugins: [],
};
export default config;
