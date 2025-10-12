import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LandingPageProps = {
  style?: React.CSSProperties;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  handleSubmit: () => void;
};

const LandingPage: React.FC<LandingPageProps> = ({
  style,
  phoneNumber: phoneNumberProp,
  setPhoneNumber: setPhoneNumberProp,
  handleSubmit: handleSubmitProp,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(phoneNumberProp);
  
  const handleSetPhoneNumber = (number: string) => {
    setPhoneNumber(number);
  };
  
  useEffect(() => {
    setPhoneNumberProp(phoneNumber);
  }, [phoneNumber, setPhoneNumberProp]);
  
  return (
    <div
      className="bg-black flex flex-col justify-center items-center px-16 py-12 max-md:px-5"
      style={style}
    >
      <div className="w-full max-w-[1157px] mt-5 mb-56 max-md:max-w-full max-md:mb-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch w-[65%] max-md:w-full max-md:ml-0">
            <div className="flex grow flex-col max-md:max-w-full max-md:mt-10">
              <Image src="/logo.png" alt="GDS Logo" width={655} height={100} />
              <div className="text-white text-5xl font-bold self-stretch mt-32 max-md:max-w-full max-md:text-4xl max-md:mt-10">
                <span className="font-medium">
                  Please type in your WhatsApp phone number to view your
                  personalized{" "}
                </span>
                <span className="font-medium text-blue-500">G</span>
                <span className="font-medium text-red-500">D</span>
                <span className="font-medium text-yellow-500">S</span>
                <span className="font-medium text-green-600">C </span>
                <span className="font-medium">Babcock Wrapped.</span>
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
              
              {/* --- START OF CHANGES --- */}

              {/* The <div> was changed to a <label> and linked to the input with htmlFor */}
              <label
                htmlFor="phone"
                className="text-white text-xl leading-6 self-stretch mt-20 max-md:max-w-full max-md:mt-10"
              >
                Input your whatsapp Number
              </label>

              {/* Attributes were added to the input field for accessibility and mobile UX */}
              <input
                id="phone"                 // ✅ Added id="phone"
                type="tel"                 // ✅ Changed type to "tel"
                inputMode="tel"            // ✅ Added inputMode="tel"
                aria-describedby="phone-helper-text" // ✅ Added aria-describedby
                className="text-neutral-600 text-base leading-6 whitespace-nowrap justify-center rounded border border-[color:var(--Primary-M\_Blue,#0671E0)] bg-blue-50 self-stretch mt-3.5 pl-5 pr-16 py-5 border-solid items-start max-md:max-w-full max-md:pr-5"
                placeholder="+234 000 0000 000"
                onChange={(e) => handleSetPhoneNumber(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitProp();
                  }
                }}
              />
              
              {/* Added a helper text paragraph that is linked by aria-describedby */}
              <p id="phone-helper-text" className="text-gray-400 text-sm mt-2 max-md:max-w-full">
                Please enter the phone number associated with your WhatsApp account.
              </p>
              
              {/* --- END OF CHANGES --- */}

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
          id="Button1"
          className="bg-[#4286f5] md:w-1/3 h-12 cursor-pointer font-['Inter'] rounded w-full mt-2 md:mt-0"
          onClick={handleSubmitProp}
        >
          <div
            id="Label"
            className="text-center text-lg leading-[24px] text-white"
          >
            Next
          </div>
        </button>
      </div>
    </div>
  );
};

export default LandingPage;