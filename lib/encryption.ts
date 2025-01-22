import CryptoJS from "crypto-js";

const SECRET_KEY: string = process.env.ENC_SECRET_KEY ?? "secret_key";

export const encryptPhoneNumber = (phoneNumber: string) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(phoneNumber, SECRET_KEY).toString();
    const valid = encrypted?.replaceAll("+", "-");
    return valid;
  } catch (error) {
    console.error("Encryption failed:", error);
    return null;
  }
};

export const decryptPhoneNumber = (encryptedPhoneNumber: string) => {
  try {
    const encrypted = encryptedPhoneNumber.replaceAll("-", "+");
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};
