import {
  SuccessGeneralResponse,
  SuccessMemberResponse,
} from "@/types/general.types";
import {
  ConcurrencyLimitError,
  CircuitOpenError,
  RetryBudgetExceededError,
  resilientHttp,
} from "@/lib/resilient-http";

function formatErrorMessage(error: unknown): string {
  if (error instanceof CircuitOpenError) {
    return "Service is temporarily unavailable while recovering from errors. Please retry shortly.";
  }
  if (error instanceof ConcurrencyLimitError) {
    return "Service is busy handling other requests. Please retry in a moment.";
  }
  if (error instanceof RetryBudgetExceededError) {
    return "Automatic retries have been throttled; manual retry is required.";
  }

  if (typeof error === "object" && error && "message" in error) {
    return String((error as { message?: string }).message ?? "Something went wrong");
  }

  return "Something went wrong";
}

const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "https://gdsc-wrapped.onrender.com";

export async function fetchGeneralData(): Promise<SuccessGeneralResponse> {
  try {
    return await resilientHttp.get<SuccessGeneralResponse>(
      "https://gdsc-wrapped.onrender.com/2023/general",
    );
  } catch (error: unknown) {
    console.error("Error fetching data:", error);
    return {
      success: false,
      error: formatErrorMessage(error),
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
  // Clean and format the phone number to match backend format: "+234 810 169 4302"
  // First, remove all spaces, hyphens, and parentheses
  let cleanNumber = number.replace(/[\s\-()]/g, "");
  
  // Ensure it starts with +234 (for Nigerian numbers)
  if (!cleanNumber.startsWith("+")) {
    if (cleanNumber.startsWith("234")) {
      cleanNumber = "+" + cleanNumber;
    } else if (cleanNumber.startsWith("0")) {
      cleanNumber = "+234" + cleanNumber.substring(1);
    } else {
      cleanNumber = "+234" + cleanNumber;
    }
  }
  
  // Format as: "+234 810 169 4302" (country code, then groups of 3)
  // Extract parts: +234 and the remaining 10 digits
  const countryCode = cleanNumber.substring(0, 4); // "+234"
  const rest = cleanNumber.substring(4); // "8101694302"
  
  // Split the rest into groups: 3, 3, 4
  const part1 = rest.substring(0, 3);   // "810"
  const part2 = rest.substring(3, 6);   // "169"
  const part3 = rest.substring(6);      // "4302"
  
  const formattedNumber = `${countryCode} ${part1} ${part2} ${part3}`;
  
  console.log("[API] Original number:", number);
  console.log("[API] Formatted number:", formattedNumber);
  console.log("[API] URL:", `https://gdsc-wrapped.onrender.com/2023/member/${encodeURIComponent(formattedNumber)}`);
  
  try {
    return await resilientHttp.get<SuccessMemberResponse>(
      `https://gdsc-wrapped.onrender.com/2023/member/${encodeURIComponent(formattedNumber)}`,
    );
  } catch (error: any) {
    console.error("Error fetching member data:", error);
    console.error("Response data:", error.response?.data);
    console.error("Response status:", error.response?.status);
    
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        formatErrorMessage(error),
    };
  }
}
