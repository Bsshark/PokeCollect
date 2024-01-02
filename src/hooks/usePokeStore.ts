import { PokemonClient, NamedAPIResourceList, Pokemon, PokemonType } from "pokenode-ts";
import { useAppDispatch, useAppSelector } from ".";
import { PokeState, RootTypes } from "../interfaces";
import { onLoadPokemon, onLoadTypes, startLoading } from "../store/poke/pokeSlice";
import pokeApi from "../api/pokeApi";

export const usePokeStore = () => {
	const dispatch = useAppDispatch();

	const nTypes = 18;

	const {
		isLoading,
		pokeSelected,
		pokemonShown,
		nPagination = 9,
		nStart = 0,
		types
	}: PokeState = useAppSelector((state) => state.poke);

	const startLoadingPokes = async () => {
		dispatch(startLoading());
		(async () => {
			const api = new PokemonClient();

			try {
				const pokemonData = await api.listPokemons(nStart, nPagination);
				var pokemonToShow: Pokemon[] = [];
				const promises = pokemonData.results.map((res) => pokeApi.get(res.url));

				Promise.all(promises).then((results) => {
					pokemonToShow = [];
					results.map((result) => {
						pokemonToShow.push(result.data);
					});
					dispatch(onLoadPokemon(pokemonToShow));
				});
			} catch (error) {
				console.error(error);
			}
		})();
	};

	const startLoadingTypes = async () => {
		try {
			
			const pokeTypes: RootTypes[] = [];
			const promises = [];
			for (let i = 1; i <= nTypes; i++) {
				promises.push(pokeApi.get(`type/${i}`));		
			}
			Promise.all(promises).then((results) => {
				results.map((result) => {
					pokeTypes.push(result.data);
					
				});
				dispatch(onLoadTypes(pokeTypes));
			})
		} catch (error) {
			console.log(error);
		}
	}

	return {
		pokemonShown,
		pokeSelected,
		isLoading,
		types,
		//Metodos
		startLoadingPokes,
		startLoadingTypes
	};
};
