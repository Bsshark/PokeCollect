import { getEnvironments } from "./../helpers/getEnvironments";
import axios from "axios";

const { VITE_API_URL } = getEnvironments();

const authApi = axios.create({
	baseURL: VITE_API_URL,
});

authApi.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (config.headers && token) {
			config.headers["x-token"] = token; 
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default authApi;
