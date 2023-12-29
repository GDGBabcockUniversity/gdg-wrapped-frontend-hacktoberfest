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
  
  if (phoneNumber.length < 12) return phoneNumber;
    const firstPart = phoneNumber.substring(0, 4); 
    const mainPart = phoneNumber.substring(4, 13); 
    const remainingPart = phoneNumber.substring(13); 
    const formattedMainPart = mainPart.match(/.{1,3}/g)?.join('%20');
    return firstPart + "%20" + formattedMainPart + remainingPart;
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
