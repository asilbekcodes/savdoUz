import config from "@/utils/config";
import { handleErrorNotification } from "@/utils/helpers";
import axios from "axios";
import { get, isEmpty } from "lodash";

const request = axios.create({
  baseURL: config.API_ROOT,
});

// Add a request interceptor
request.interceptors.request.use(
  async (config) => {
    let accessToken = "";

    const authStore = localStorage.getItem("authStore");
    if (authStore) {
      accessToken = get(JSON.parse(authStore), "state.accessToken", "");
      if (accessToken) {
        config.headers["Authorization"] = `token ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  async (error) => {
    if (!isEmpty(error)) {
      console.log(error);
      handleErrorNotification(error);
    }

    const authStore = localStorage.getItem("authStore");
    const accessToken = get(JSON.parse(authStore), "state.accessToken", "");

    if (accessToken) {
      if (
        error.response?.status === 401 &&
        !window.location.pathname !== "auth/sign-in"
      ) {
        localStorage.removeItem("authStore");
        localStorage.removeItem("userStore");
        window.location.href = "/auth/sign-in";
      }
      if (error.response?.status === 403) {
        // window.location.href = "/";
      }
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default request;
