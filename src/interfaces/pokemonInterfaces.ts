import { Pokemon, PokemonSpecies, PokemonType } from "./PokedexInterfaces";

export interface PokemonCardInfo {
	id: number | null;
	name: string | null;
	sprite?: string | null;
	types: PokemonType[];
	desc?: String;
}

//Poke State
export interface PokeState {
	isLoading: boolean;
	limit?: number;
	from?: number;
	pokeSelected?: Pokemon | null;
	pokemonShown: Pokemon[] | Pokemon;
	types: PokemonType[];
	dbTypes?: PokemonType[];
	pokemonSpecies: PokemonSpecies[];
}
