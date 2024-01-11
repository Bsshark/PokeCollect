export interface itemNamesCsvData {
	data: itemNamesCsv[];
	erros: [];
	meta: {};
}

export interface itemNamesCsv {
	genus: string;
	pokemon_species_id: string;
	local_language_id: string;
	name: string;
}