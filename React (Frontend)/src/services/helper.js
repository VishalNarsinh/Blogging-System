import axios from "axios";
import { doLogin, doLogout, getTokens } from "../auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const BASE_URL = "http://localhost:8080/api";
export const myAxios = axios.create({
  baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getTokens().jwtToken;
    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

privateAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 error (e.g., logout user)
      console.log("Inside Jwt Token failed");
      console.log(error);
      let refreshToken = getTokens().refreshToken;
      console.log("local", refreshToken);
      myAxios
        .post("/auth/refresh", {
          refreshToken: refreshToken,
        })
        .then((response) => {
          console.log(response);
          return response.data;
        })
        .then((token) => {
          console.log("Successfully refreshed");
          console.log(token);
          doLogin(token, () => {});
        })
        .catch((error) => {
          console.log("Inside refresh token failed");
          console.log(error);
          doLogout(() => {
            window.location = "/login";
          });
          toast.error("Your session has expired");
        });
    }
    return Promise.reject(error);
  }
);
