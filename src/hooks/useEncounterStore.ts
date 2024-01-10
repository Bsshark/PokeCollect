import { useAppDispatch, useAppSelector } from ".";
import { EncounterState } from "../interfaces/EncounterInterfaces";
import pokeApi from "../api/pokeApi";
import { onLoad } from "../store/encounter/encounterSlice";


export const useEncounterStore = () => {

    const max = 1025;
    const min = 1;

    const dispatch = useAppDispatch();

    const { nRandom, nShinyRandom, pokemon, isLoading, isCaptured }: EncounterState = useAppSelector((state) => state.encounter);

    

    const startLoadingPokemon = () => {
        const randomNumber = Math.round(Math.random() * (max - min + 1) + min);
        startLoadingPokemonById(randomNumber);
    }



    const startLoadingPokemonById = async (id: number) => {
		try {
			await pokeApi.get(`/pokemon/${id}`).then((result) => {
				dispatch(onLoad(result.data));
			})

		} catch (error) {
			console.log(error);
		}
	}


    return {
        nRandom,
        nShinyRandom,
        pokemon,
        isLoading,
        isCaptured,
        //Metodos
        startLoadingPokemon
    }

}