import { useAppDispatch, useAppSelector } from ".";
import { PokeState } from "../interfaces";
import {
	onLoadDBTypes,
	onLoadPokemon,
	onLoadSpecies,
	onLoadTypes,
	onSetPokedexLimits,
	startLoading,
} from "../store/poke/pokeSlice";
import pokeApi from "../api/pokeApi";
import {
	Pokemon,
	PokemonSpecies,
	PokemonType,
} from "../interfaces/PokedexInterfaces";
import { findSpeciesById, findTypeInLanguage } from "../helpers/pokeHelp";

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
		pokemonSpecies,
	}: PokeState = useAppSelector((state) => state.poke);

	const startLoadingPokes = async (
		query?: string,
		newLimit?: number,
		newFrom?: number,
		typeFilter?: string
	) => {
		let headerConfig = { limit, from, typeFilter: ""};

		if (newLimit && newFrom) {
			headerConfig = { ...headerConfig, limit: newLimit, from: newFrom };
		} else if ("limit" in localStorage && "from" in localStorage) {
			headerConfig = {
				...headerConfig,
				limit: Number(localStorage.getItem("limit")),
				from: Number(localStorage.getItem("from")),
			};
		}
		if(typeFilter && typeFilter !== "Tipo") headerConfig = {...headerConfig, typeFilter: typeFilter.toLowerCase()};
		console.log(headerConfig);

		dispatch(startLoading());
		(async () => {
			try {
				var pokemonToShow: Pokemon[] = [];
				var speciesPromises: Promise<any>[] = [];
				if (query !== "" && query) {
					pokeApi.get<Pokemon[]>(`/pokemon/name/${query}`, { headers: headerConfig }).then((result) => {
						
						result.data.forEach((pokemon: Pokemon) => {
							speciesPromises.push(
								pokeApi.get(`/pokemon/species/${pokemon.id}`)
							);
						});
						Promise.all(speciesPromises).then((resultSpecies) => {
							const speciesData: PokemonSpecies[] = [];
							resultSpecies.forEach((result) => {
								speciesData.push(result.data);
							});
							result.data.forEach((pokemonFetched: Pokemon) => {
								const specie = speciesData.find(
									(specie) => specie.id === pokemonFetched.id
								);
								if (specie) {
									const desc = findSpeciesById(specie, "es");
									if (desc) {
										pokemonToShow.push({
											...pokemonFetched,
											desc: desc.flavor_text,
										});
									} else {
										pokemonToShow.push(pokemonFetched);
									}
								}
							});
							dispatch(onLoadPokemon(pokemonToShow));
						});
					});
				} else if ((query === "" || !query)) {
					pokeApi
						.get<Pokemon[]>(`/pokemon/pagination/page`, { headers: headerConfig })
						.then((result) => {
							console.log(`headerConfig: ${headerConfig.from} ${headerConfig.typeFilter}`);
							result.data.forEach((pokemon: Pokemon) => {
								speciesPromises.push(
									pokeApi.get(`/pokemon/species/${pokemon.id}`)
								);
							});
							Promise.all(speciesPromises).then((resultSpecies) => {
								const speciesData: PokemonSpecies[] = [];
								resultSpecies.forEach((result) => {
									speciesData.push(result.data);
								});

								result.data.forEach((pokemonFetched: Pokemon) => {
									const specie = speciesData.find(
										(specie) => specie.id === pokemonFetched.id
									);
									if (specie) {
										const desc = findSpeciesById(specie, "es");
										if (desc) {
											pokemonToShow.push({
												...pokemonFetched,
												desc: desc.flavor_text,
											});
										}
									}
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
						});
				}
				//Descs
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

	const startLoadingPokemonSpecies = async (id?: string, ids?: string[]) => {
		try {
			if (id) {
				//By ID
				pokeApi.get(`/pokemon/species/${id}`).then((result) => {});
			} else if (ids) {
				//Get all by ID
				const pokemonSpeciesToShow: PokemonSpecies[] = [];
				const speciesPromises: Promise<any>[] = [];
				ids.forEach((id) => {
					speciesPromises.push(pokeApi(`/pokemon/species/${id}`));
				});
				Promise.all(speciesPromises).then((results) => {
					results.map((result) => {
						pokemonSpeciesToShow.push(result.data);
					});
					dispatch(onLoadSpecies(pokemonSpeciesToShow));
				});
			} else {
				//Get all by page
				const pokemonSpeciesToShow: PokemonSpecies[] = [];
				const speciesPromises: Promise<any>[] = [];
				let ids: Number[] = [];
				pokemonShown.forEach((pokemon) => {
					ids.push(pokemon.id);
				});

				ids.forEach((id) => {
					speciesPromises.push(pokeApi(`/pokemon/species/${id}`));
				});
				Promise.all(speciesPromises).then((results) => {
					results.map((result) => {
						pokemonSpeciesToShow.push(result.data);
					});
					pokemonSpeciesToShow.map((specie) => {
						console.log(
							specie.flavor_text_entries.find(
								(entry) => entry.language.name === "es"
							)?.flavor_text
						);
					});
					dispatch(onLoadSpecies(pokemonSpeciesToShow));
				});
			}
		} catch (error) {}
	};

	return {
		pokemonShown,
		pokeSelected,
		isLoading,
		types,
		limit,
		from,
		dbTypes,
		pokemonSpecies,
		//Metodos
		startLoadingPokes,
		startLoadingTypes,
	};
};
