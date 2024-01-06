import axios from "axios";
import { getEnvironments } from '../helpers';

//const PokeApiUrl = 'https://pokeapi.co/api/v2/';
const { VITE_API_URL } = getEnvironments();

const pokeApi = axios.create({
	baseURL: VITE_API_URL,
});

export default pokeApi;
