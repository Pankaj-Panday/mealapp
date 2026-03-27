export function maskPhone(
  phone?: string,
  startVisible = 3,
  endVisible = 3,
  maskChar = 'X',
) {
  if (!phone) return '';

  const phoneStr = String(phone);
  const maskLength = phoneStr.length - (startVisible + endVisible);

  if (maskLength <= 0) return phoneStr;

  const mask = maskChar.repeat(maskLength);

  return (
    phoneStr.slice(0, startVisible) +
    mask +
    phoneStr.slice(phoneStr.length - endVisible)
  );
}
