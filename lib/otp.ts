export const generateOtp = () => {
  // const otp = Math.floor(100000 + Math.random() * 900000);
  const otp = Math.floor(1000 + Math.random() * 9000);
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  console.log(`Your OTP is: ${otp}`);
  return { otp, otpExpires };
};
