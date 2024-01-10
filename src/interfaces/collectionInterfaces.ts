import { Pokemon } from "./PokedexInterfaces";

export interface CollectionState {
	isLoading: boolean;
	collection: Collection | null;
}

export interface Collection {
	id: number;
	user_id: number;
	collection_items: CollectionItem[];
}

export interface CollectionItem extends Pokemon {
	isShiny: boolean;
	date_caught: Date;
}
