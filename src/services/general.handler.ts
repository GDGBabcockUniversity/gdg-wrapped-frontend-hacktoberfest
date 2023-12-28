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

export async function fetchMemberData(
  number: string
): Promise<SuccessMemberResponse | ErrorGeneralResponse> {
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
