import axios from "axios";

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "algo"
    : "https://6663-2806-2f0-1100-1276-3c85-442c-16f-32d1.ngrok.io";

const instance = axios.create({
  baseURL,
});

export default instance;
