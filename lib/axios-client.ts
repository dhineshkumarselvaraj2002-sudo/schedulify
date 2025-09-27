import axios from "axios";
import { useStore } from "@/store/store";
import { CustomError } from "@/types/custom-error.type";
import { ENV } from "./get-env";

const baseURL = "http://localhost:8000/api";

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

//*** FOR API WITH TOKEN */
export const API = axios.create(options);

API.interceptors.request.use((config) => {
  // Only access store on client side
  if (typeof window !== 'undefined') {
    const accessToken = useStore.getState().accessToken;
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { data, status } = error.response;
    if (data === "Unauthorized" && status === 401) {
      // Only clear store on client side
      if (typeof window !== 'undefined') {
        const store = useStore.getState();
        store.clearUser();
        store.clearAccessToken();
        store.clearExpiresAt();
        window.location.href = "/";
      }
    }

    console.log(data, "data");
    const customError: CustomError = {
      ...error,
      message: data?.message,
      errorCode: data?.errorCode || "UNKNOWN_ERROR",
    };

    return Promise.reject(customError);
  }
);

//*** FOR API DONT NEED TOKEN */
export const PublicAPI = axios.create(options);

PublicAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { data } = error.response;
    const customError: CustomError = {
      ...error,
      message: data?.message,
      errorCode: data?.errorCode || "UNKNOWN_ERROR",
    };
    return Promise.reject(customError);
  }
);
