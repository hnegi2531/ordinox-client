import CryptoJS from "crypto-js";

//The Function Below To Encrypt Text

export const encryptWithAES = ({ text, password }: { text: string; password: string }) => {
  const passphrase = password;
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};
//The Function Below To Decrypt Text
export const decryptWithAES = ({ ciphertext, password }: { ciphertext: string; password: string }) => {
  const passphrase = password;
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
