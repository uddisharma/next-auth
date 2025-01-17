export function parseTimeRange(timeRange: string | null): Date {
  const now = new Date();
  switch (timeRange) {
    case "1M":
      return new Date(now.setMonth(now.getMonth() - 1));
    case "6M":
      return new Date(now.setMonth(now.getMonth() - 6));
    case "1Y":
      return new Date(now.setFullYear(now.getFullYear() - 1));
    default:
      return new Date(0);
  }
}
