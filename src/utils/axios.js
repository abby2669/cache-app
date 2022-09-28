import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { BACKEND_URL } from "./url";

const common_axios = Axios.create({
  baseURL: BACKEND_URL,
});

common_axios.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("access_token");
    console.log(access_token);
    const access_token = token;
    if (access_token) {
      config.headers.common = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default common_axios;
