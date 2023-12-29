export function formatPhoneNumber(phoneNumber: string): string {
  if (phoneNumber.length < 12) return phoneNumber;
  const firstPart = phoneNumber.substring(0, 4);
  const mainPart = phoneNumber.substring(4, 13);
  const remainingPart = phoneNumber.substring(13);
  const formattedMainPart = mainPart.match(/.{1,3}/g)?.join("%20");
  console.log("number is ",phoneNumber);

  return firstPart + formattedMainPart + remainingPart;

}
