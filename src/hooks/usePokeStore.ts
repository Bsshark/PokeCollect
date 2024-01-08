import { useAppDispatch, useAppSelector } from ".";
import { PokeState } from "../interfaces";
import {
	onLoadDBTypes,
	onLoadPokemon,
	onLoadTypes,
	onSetPokedexLimits,
	startLoading,
} from "../store/poke/pokeSlice";
import pokeApi from "../api/pokeApi";
import { Pokemon, PokemonType } from "../interfaces/PokedexInterfaces";
import { findTypeInLanguage } from "../helpers/pokeHelp";

export const usePokeStore = () => {
	const dispatch = useAppDispatch();

	const nTypes = 18; //Pokemon types quantity

	const {
		isLoading,
		pokeSelected,
		pokemonShown,
		limit = 9,
		from = 1,
		types,
		dbTypes,
	}: PokeState = useAppSelector((state) => state.poke);

	const startLoadingPokes = async (
		query?: string,
		newLimit?: number,
		newFrom?: number
	) => {
		let headerConfig = { limit, from };

		if (newLimit && newFrom) {
			headerConfig = { ...headerConfig, limit: newLimit, from: newFrom };
		} else if ("limit" in localStorage && "from" in localStorage) {
			headerConfig = {
				...headerConfig,
				limit: Number(localStorage.getItem("limit")),
				from: Number(localStorage.getItem("from")),
			};
		}

		dispatch(startLoading());
		(async () => {
			try {
				var pokemonToShow: Pokemon[] = [];
				if (query !== "" && query) {
					pokeApi.get(`/pokemon/name/${query}`).then((result) => {
						result.data.forEach((pokemon: Pokemon) => {
							pokemonToShow.push(pokemon);
						});
						dispatch(onLoadPokemon(pokemonToShow));
					});
				} else if (query === "" || !query) {
					pokeApi
						.get(`/pokemon/pagination/page`, { headers: headerConfig })
						.then((result) => {
							result.data.forEach((pokemon: Pokemon) => {
								pokemonToShow.push(pokemon);
							});
							localStorage.setItem("limit", headerConfig.limit.toString());
							localStorage.setItem("from", headerConfig.from.toString());

							dispatch(onLoadPokemon(pokemonToShow));
							dispatch(
								onSetPokedexLimits({
									limit: headerConfig.limit,
									from: headerConfig.from,
								})
							);
						});

					/* const pokemonData = await api.listPokemons(nStart, nPagination);

					const promises = pokemonData.results.map((res) => pokeApi.get(res.url));
					Promise.all(promises).then((results) => {
						pokemonToShow = [];
						results.map((result) => {
							pokemonToShow.push(result.data);
						});
						dispatch(onLoadPokemon(pokemonToShow));
					}); */
				}
			} catch (error) {
				console.error(error);
			}
		})();
	};

	const startLoadingTypes = async () => {
		try {
			const pokeTypes: PokemonType[] = [];
			const promises = [];
			for (let i = 1; i <= nTypes; i++) {
				promises.push(pokeApi.get(`/pokemon/type/${i}`));
			}
			Promise.all(promises).then((results) => {
				results.map((result) => {
					pokeTypes.push(result.data);
				});
				dispatch(onLoadDBTypes(pokeTypes));
				dispatch(onLoadTypes(findTypeInLanguage("es", pokeTypes)));
			});
		} catch (error) {
			console.log(error);
		}
	};

	const startSearchingPokemonByName = async (pokemonName: string) => {
		/* dispatch(startLoading());
		try {
			const results = await pokeApi.get(`/pokemon/name/${pokemonName}`);
			dispatch(onLoadTypes(results.data));
		} catch (error) {
			console.log(error);
		} */
	};

	return {
		pokemonShown,
		pokeSelected,
		isLoading,
		types,
		limit,
		from,
		dbTypes,
		//Metodos
		startLoadingPokes,
		startLoadingTypes,
		startSearchingPokemonByName,
	};
};
