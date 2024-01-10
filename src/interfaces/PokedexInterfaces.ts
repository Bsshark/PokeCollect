/* -- Pokemon -- */
export interface Pokemon {
	_id: Id;
	game_indices: Index[];
	id: number;
	name: string;
	sprites: Sprites;
	types: PokemonType[];
	desc: string;
	weight: number;
	__v: number;
}

export interface Id {
	$oid: string;
}

export interface Index {
	game_index: number;
	version: Version;
	_id: Id2;
}

export interface Version {
	name: string;
	url: string;
}

export interface Id2 {
	$oid: string;
}

export interface Sprites {
	back_default: string;
	back_shiny: string;
	front_default: string;
	front_shiny: string;
}

export interface Type {
	_id: Id3;
}

export interface Id3 {
	$oid: string;
}

/* -- Species -- */
export interface PokemonSpecies {
	_id: Id;
	id: number;
	name: string;
	capture_rate: number;
	evolution_chain: EvolutionChain;
	evolves_from_species: EvolvesFromSpecies;
	flavor_text_entries: Flavor_Text[];
	genera: any[];
	generation: Generation;
	is_legendary: boolean;
	__v: number;
}

export interface Flavor_Text {
	flavor_text: string;
	language: Language;
	version: Version;
}

export interface Version {
	name: string;
	url: string;
}

export interface Id {
	$oid: string;
}

export interface EvolutionChain {
	url: string;
}

export interface EvolvesFromSpecies {
	name: string;
	url: string;
}

export interface Generation {
	name: string;
	url: string;
}

/* -- Types -- */
export interface PokemonType {
	_id: Id;
	id: number;
	name: string;
	names: Name[];
	__v: number;
}

export interface Id {
	$oid: string;
}

export interface Name {
	name: string;
	language: Language;
	_id: Id2;
}

export interface Language {
	name: string;
	url: string;
}

export interface Id2 {
	$oid: string;
}
