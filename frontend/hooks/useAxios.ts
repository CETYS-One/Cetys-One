import axios from "axios";
import { useEffect, useRef } from "react";
import config from "../config.json";
import { baseURL } from "../util/axios";

export const useAxios = (token?: string) => {
  const axiosInstance = useRef(axios.create({ baseURL }));

  useEffect(() => {
    if (token) {
      axiosInstance.current.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
  }, [token]);

  return axiosInstance.current;
};

export const getAxios = (token?: string) =>
  axios.create({
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    baseURL,
  });
