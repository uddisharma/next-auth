export function calculateReadingTime(text: string): {
  minutes: number;
  seconds: number;
} {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const totalMinutes = words / wordsPerMinute;
  const totalSeconds = Math.ceil(totalMinutes * 60);
  const minutes = Math.floor(totalMinutes);
  const seconds = totalSeconds % 60;
  return {
    minutes: minutes,
    seconds: seconds,
  };
}
