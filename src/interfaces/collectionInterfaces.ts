import { Pokemon } from "./PokedexInterfaces";

export interface CollectionState {
	isLoading: boolean;
	collection: Collection;
}

export interface Collection {
	id: number;
	user_id: String;
	collection_items: CollectionItem[];
}

export interface CollectionItem extends Pokemon {
	isShiny: boolean;
	date_caught: Date;
}
