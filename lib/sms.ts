export async function sendSMS(phone: string, message: string): Promise<void> {
  console.log(`Sending SMS to ${phone}: ${message}`);
}
