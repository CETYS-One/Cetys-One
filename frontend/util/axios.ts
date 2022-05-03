import axios, { AxiosError } from "axios";
import config from "../config.json";

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://cetys-one.herokuapp.com"
    : config.baseUrl;

const instance = axios.create({
  baseURL,
});

export const getErrorMessage = (error: AxiosError) => {
  const findKey = (
    object: any,
    keyObj: string,
    type: "string" | "object" | "array"
  ): string | undefined => {
    for (const key of Object.keys(object)) {
      if (key === keyObj && typeof object[key] === type) {
        return object[key];
      }

      if (typeof object[key] === "string") continue;
      else if (Array.isArray(object[key])) {
        let errorMsg: string | undefined = "";
        for (const arrayElement of object[key]) {
          if (typeof arrayElement === "object") {
            errorMsg = findKey(arrayElement, keyObj, type);
          }
          return errorMsg;
        }
      } else if (typeof object[key] === "object") {
        return findKey(object[key], keyObj, type);
      }
    }
    return undefined;
  };

  return findKey(error.response?.data, "message", "string");
};

export default instance;
