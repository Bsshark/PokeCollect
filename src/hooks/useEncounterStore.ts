import { useAppDispatch, useAppSelector } from ".";
import { EncounterState } from "../interfaces/EncounterInterfaces";
import pokeApi from "../api/pokeApi";
import {
	onLoad,
	onStartLoad,
	onStopLoading,
} from "../store/encounter/encounterSlice";
import { calculateChance } from "../helpers/pokeHelp";
import { AuthUser } from "../interfaces";
import { Collection, CollectionItem } from '../interfaces/collectionInterfaces';
import { useCollectionStore } from "./useCollectionStore";

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

	const { startUpdatingCollection } = useCollectionStore();

	const startLoadingPokemon = (next: boolean = false) => {
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

	const startCatchingPokemon = async (newItem: CollectionItem, user: AuthUser) => {
		try {
			dispatch(onStartLoad());
			await pokeApi.get(`/pokemon/species/${pokemon.id}`).then((result) => {
				const tryN = Math.round(Math.random() * (100 - 0 + 1) + 0);
				const chance = calculateChance(result.data.capture_rate, 1, "");
				if (tryN < chance) {
					//Capturado
					console.log(`Has sacado ${tryN} de ${chance}. Capturado!`);
					try {
						if(!user) { dispatch(onStopLoading()); return;}

						pokeApi.get<Collection>(`collection/find/${user.uid}`).then(({data}) => {
							
							const currentCollection = data.collection_items;
							console.log(currentCollection);

							currentCollection.push(newItem);
							console.log({...data, collection_items: currentCollection})
							startUpdatingCollection({...data, collection_items: currentCollection, user_id: user.uid!});

							startLoadingPokemon(true);
						})

						/* const resp = pokeApi.post(`collection/add`, {
							user_id: user.uid,
							collection: 
						}) */
					} catch (error) {
						console.log(error)
					}
					
				} else {
					//No capturado
					console.log(`Has sacado ${tryN} de ${chance}. Fallado!`);
					
				}
				dispatch(onStopLoading());
			});
		} catch (error) {
			console.log(error);
		}
	};

	return {
		nRandom,
		nShinyRandom,
		pokemon,
		isLoading,
		isCaptured,
		//Metodos
		startLoadingPokemon,
		startCatchingPokemon,
	};
};
