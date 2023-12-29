import axios from "axios";
import {
  ErrorGeneralResponse,
  SuccessGeneralResponse,
  SuccessMemberResponse,
} from "@/types/general.types";

export async function fetchGeneralData(): Promise<
  SuccessGeneralResponse | ErrorGeneralResponse
> {
  try {
    const response = await axios.get<SuccessGeneralResponse>(
      "https://gdsc-wrapped.onrender.com/2023/general"
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return {
      success: false,
      error: error.message ?? "Something went wrong",
    };
  }
}
function formatPhoneNumber(phoneNumber: string): string {
  // Check if the number starts with the country code and has a sufficient length to format
  
  const countryCode: string = phoneNumber.slice(0, 4);
  const mainNumber: string = phoneNumber.slice(4);
  const formattedMainNumber: string | undefined = mainNumber
    .match(/.{1,3}/g)?.map((chunk, index, array) => 
      index < array.length - 1 ? chunk + '%20' : chunk
    )
    .join('');

  // Combine the country code and the formatted main part of the number
  return countryCode + formattedMainNumber;
}

export async function fetchMemberData(
  number: string
): Promise<SuccessMemberResponse | ErrorGeneralResponse> {
  number = formatPhoneNumber(number);
  console.log("number is ",number);
  try {
    const response = await axios.get<SuccessMemberResponse>(
    "https://gdsc-wrapped.onrender.com/2023/member/"+number+""
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return {
      success: false,
      error: error.message ?? "Something went wrong",
    };
  }
}
