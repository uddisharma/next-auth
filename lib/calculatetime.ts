export function calculateReadingTime(text: string): { minutes: number; seconds: number } {
    const wordsPerMinute = 200; 
    const words = text.split(/\s+/).length; 
    const minutes = words / wordsPerMinute;
    const seconds = Math.ceil(minutes * 60); 

    return {
        minutes: Math.floor(minutes),
        seconds: seconds
    };
}