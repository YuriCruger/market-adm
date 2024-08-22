export function calculatePercentageDifference(
  initialValue: number,
  finalValue: number,
) {
  const difference = finalValue - initialValue;
  const percentageDifference = (difference / initialValue) * 100;
  return percentageDifference;
}
