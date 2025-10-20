export function formatPhoneNumber(phoneNumber: string): string {
  // Normalize: strip spaces, hyphens, parentheses
  phoneNumber = phoneNumber.replace(/[\s\-()]/g, "");

  // Handle Nigerian local numbers: 10 or 11 digits
  if (!phoneNumber.startsWith("+") && (phoneNumber.length === 10 || phoneNumber.length === 11)) {
    if (phoneNumber.length === 11) {
      // Drop leading 0
      phoneNumber = "+234" + phoneNumber.substring(1);
    } else {
      phoneNumber = "+234" + phoneNumber;
    }
  }

  // Helper: format with 3-3-4 when exactly 10 digits, else chunk by 3s
  const formatRest = (restDigits: string): string => {
    if (restDigits.length === 10) {
      const a = restDigits.slice(0, 3);
      const b = restDigits.slice(3, 6);
      const c = restDigits.slice(6, 10);
      return `${a} ${b}-${c}`;
    }
    return restDigits.match(/.{1,3}/g)?.join(" ") ?? restDigits;
  };

  // Country-specific handling
  if (phoneNumber.startsWith("+1")) {
    const rest = phoneNumber.slice(2);
    const formatted = formatRest(rest);
    return "+1 " + formatted;
  }

  if (phoneNumber.startsWith("+233") || phoneNumber.startsWith("+234")) {
    const cc = phoneNumber.substring(0, 4);
    const rest = phoneNumber.slice(4);
    return cc + " " + formatRest(rest);
  }

  // Default: if it looks like +CCC..., split country code (+ and next 2-3 digits) and chunk rest by 3
  if (phoneNumber.startsWith("+")) {
    // Try +XYZ first, else +XY
    const potentialLong = phoneNumber.substring(0, 4);
    const potentialShort = phoneNumber.substring(0, 3);
    const useLong = /\+\d{3}/.test(potentialLong);
    const cc = useLong ? potentialLong : potentialShort;
    const rest = phoneNumber.slice(cc.length);
    const grouped = rest.match(/.{1,3}/g)?.join(" ") ?? rest;
    return cc + " " + grouped;
  }

  // Fallback: return as-is (already normalized)
  return phoneNumber;
}
