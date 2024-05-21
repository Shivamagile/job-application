import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

export const randomString = (len: number) => {
  const digits = '0123456789';
  let randomDigits = '';

  const randomNumber = randomBytes(len);

  for (let i = 0; i < len; i++) {
    const randomValue = randomNumber.readUInt8(i);
    const randomIndex = randomValue % digits.length;
    randomDigits += digits.charAt(randomIndex);
  }
  return randomDigits;
};

export const bcryptPassword = async (password: string, salt: number) => {
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const generateRandomString = (length: number, type: string = null) => {
  let charSet = '';
  let randomString = '';
  if (type === 'number') {
    charSet = '123456789';
  } else {
    charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  }

  for (let i = 0; i < length; i++) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};
