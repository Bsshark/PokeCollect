import { useAppDispatch, useAppSelector } from ".";
import { EncounterState } from "../interfaces/EncounterInterfaces";
import pokeApi from "../api/pokeApi";
import { onLoad, onStartLoad, onStopLoading } from "../store/encounter/encounterSlice";
import { Pokemon } from "../interfaces/PokedexInterfaces";
import { calculateChance } from "../helpers/pokeHelp";

export const useEncounterStore = () => {
	const max = 1025;
	const min = 1;

	const dispatch = useAppDispatch();

	const {
		nRandom,
		nShinyRandom,
		pokemon,
		isLoading,
		isCaptured,
	}: EncounterState = useAppSelector((state) => state.encounter);

	const startLoadingPokemon = (next?: boolean) => {
        dispatch(onStartLoad());
		const randomNumber = Math.round(Math.random() * (max - min + 1) + min);
		if (next) {
			startLoadingPokemonById(randomNumber, next);
			return;
		}
		startLoadingPokemonById(randomNumber);
	};

	const startLoadingPokemonById = async (id: number, next?: boolean) => {
		try {
			if (!("pokemonEncounter" in localStorage) || next) {
				
				await pokeApi.get(`/pokemon/${id}`).then((result) => {
					
					localStorage.setItem("pokemonEncounter", JSON.stringify(result.data));
					dispatch(onLoad(result.data));
				});
			} else {
				var pkm = JSON.parse(localStorage.getItem("pokemonEncounter") || "{}");
				dispatch(onLoad(pkm));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const startCatchingPokemon = async(pokemon: Pokemon) => {
		try {
			dispatch(onStartLoad());
			await pokeApi.get(`/pokemon/species/${pokemon.id}`).then((result) => {
				const tryN = Math.round(Math.random() * (100 - 0 + 1) + 0);
				const chance = calculateChance(result.data.capture_rate, 1, "");
				if (tryN <  chance) {
					//Capturado
					console.log(`Has sacado ${tryN} de ${chance}. Capturado!`)
					startLoadingPokemon(true);
				} else {
					//No capturado
					console.log(`Has sacado ${tryN} de ${chance}. Fallado!`)
					dispatch(onStopLoading());
				}
			})
		} catch (error) {
			console.log(error)
		}
	}

	return {
		nRandom,
		nShinyRandom,
		pokemon,
		isLoading,
		isCaptured,
		//Metodos
		startLoadingPokemon,
		startCatchingPokemon
	};
};
