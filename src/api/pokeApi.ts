import axios from "axios";
import { getEnvironments } from '../helpers';

//const PokeApiUrl = 'https://pokeapi.co/api/v2/';
const { VITE_API_URL } = getEnvironments();

const pokeApi = axios.create({
	baseURL: VITE_API_URL,
});

pokeApi.interceptors.request.use(
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

export default pokeApi;
