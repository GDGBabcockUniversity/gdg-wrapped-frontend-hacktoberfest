import axios from "axios";
import {
  SuccessGeneralResponse,
  SuccessMemberResponse,
} from "@/types/general.types";
import { formatPhoneNumber } from "@/utilities/utils";

export async function fetchGeneralData(): Promise<SuccessGeneralResponse> {
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
// function formatPhoneNumber(phoneNumber: string): string {

//   if (phoneNumber.length < 12) return phoneNumber;
//     const firstPart = phoneNumber.substring(0, 4);
//     const mainPart = phoneNumber.substring(4, 13);
//     const remainingPart = phoneNumber.substring(13);
//     const formattedMainPart = mainPart.match(/.{1,3}/g)?.join('%20');
//     return firstPart + "%20" + formattedMainPart + remainingPart;
// }

export async function fetchMemberData(
  number: string
): Promise<SuccessMemberResponse> {
  number = formatPhoneNumber(number);
  try {
    const response = await axios.get<SuccessMemberResponse>(
      `https://gdsc-wrapped.onrender.com/2023/member/${number}`
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
