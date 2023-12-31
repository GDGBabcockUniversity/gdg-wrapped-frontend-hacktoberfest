export function formatPhoneNumber(phoneNumber: string): string {
  phoneNumber = phoneNumber.replaceAll(" ", "");

  if (phoneNumber.startsWith("+22")) {
    let fp = phoneNumber.substring(0, 4);

    let rest = "",
      count = 0;

    for (let num of phoneNumber.slice(4)) {
      count++;
      rest += num;

      if (count != 0 && (count & 1) == 0) {
        rest += " ";
      }
    }

    return fp + " " + rest;
  }

  if (phoneNumber.startsWith("+1")) {
    let fp = phoneNumber.substring(0, 2);

    let midpart = phoneNumber.substring(2, 7);

    let rest = phoneNumber.slice(7);

    if (rest.length == 7) {
      rest = rest.slice(0, 3) + "-" + rest.slice(3);
    }

    return fp + " " + midpart + " " + rest;
  }

  if (phoneNumber.length == 10) {
    phoneNumber = "+234" + phoneNumber;
  }

  if (phoneNumber.length == 11) {
    phoneNumber = "+234" + phoneNumber.substring(1);
  }

  const firstPart = phoneNumber.substring(0, 4);
  const mainPart = phoneNumber.substring(4, 13);
  const remainingPart = phoneNumber.substring(13);
  const formattedMainPart = mainPart.match(/.{1,3}/g)?.join(" ");

  return firstPart + " " + formattedMainPart + remainingPart;
}
