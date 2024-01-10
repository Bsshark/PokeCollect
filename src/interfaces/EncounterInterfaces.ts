import { Pokemon } from "./PokedexInterfaces";

export interface EncounterState {
	isLoading: boolean;
	nRandom: number | null;
	nShinyRandom: number | null;
	pokemon: Pokemon;
    isCaptured: boolean;
}
