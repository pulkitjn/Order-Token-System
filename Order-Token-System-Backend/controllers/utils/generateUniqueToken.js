import { nanoid } from "nanoid";

const zeroPad = (number, length) =>{
  return number.toString().padStart(length, "0");
}

const generateUniqueToken = (len) => {
  const date = new Date();
  const year = zeroPad(date.getFullYear() % 100, 2);
  const month = zeroPad(date.getMonth() + 1, 2);
  const day = zeroPad(date.getDate(), 2);
  const hours = zeroPad(date.getHours(), 2);
  const minutes = zeroPad(date.getMinutes(), 2);
  const seconds = zeroPad(date.getSeconds(), 2);
  const milliseconds = zeroPad(date.getMilliseconds(),3);
  const genId = nanoid(len);
  return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}${genId}`;
}

export default generateUniqueToken;

