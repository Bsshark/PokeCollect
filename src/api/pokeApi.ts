import { PokemonClient } from 'pokenode-ts';
import axios from "axios";

const PokeApiUrl = 'https://pokeapi.co/api/v2/';

const pokeApi = axios.create({
	baseURL: PokeApiUrl,
});

export default pokeApi;
