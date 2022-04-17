import axios from "axios";
import config from "../config.json";

export const baseURL =
  process.env.NODE_ENV === "production" ? "algo" : config.baseUrl;

const instance = axios.create({
  baseURL,
});

export default instance;
