import { PokemonClient, NamedAPIResourceList, Pokemon, PokemonType } from "pokenode-ts";
import { useAppDispatch, useAppSelector } from ".";
import { PokeState, RootTypes } from "../interfaces";
import { onLoadPokemon, onLoadTypes, startLoading } from "../store/poke/pokeSlice";
import pokeApi from "../api/pokeApi";

export const usePokeStore = () => {
	const dispatch = useAppDispatch();

	const nTypes = 18; //Pokemon types quantity

	const {
		isLoading,
		pokeSelected,
		pokemonShown,
		nPagination = 12,
		nStart = 0,
		types
	}: PokeState = useAppSelector((state) => state.poke);

	const startLoadingPokes = async (query?: string) => {
		dispatch(startLoading());
		(async () => {
			const api = new PokemonClient();

			try {
				var pokemonToShow: Pokemon[] = [];
				if(query) {
					const pokemonData = await api.getPokemonByName(query);
					pokemonToShow.push(pokemonData);
					dispatch(onLoadPokemon(pokemonToShow));
				} else {
					const pokemonData = await api.listPokemons(nStart, nPagination);

					const promises = pokemonData.results.map((res) => pokeApi.get(res.url));
					Promise.all(promises).then((results) => {
						pokemonToShow = [];
						results.map((result) => {
							pokemonToShow.push(result.data);
						});
						dispatch(onLoadPokemon(pokemonToShow));
					});
				}
				

				
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

	const startSearchingPokemonByName = async (pokemonName: string) => {
		dispatch(startLoading());
		try {
			const results = await pokeApi.get(`pokemon/${pokemonName}`);



			dispatch(onLoadTypes(results.data))
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
		startLoadingTypes,
		startSearchingPokemonByName
	};
};
