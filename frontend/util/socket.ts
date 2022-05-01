import io from "socket.io-client";
import { baseURL } from "./axios";

export const socket = io(baseURL);
