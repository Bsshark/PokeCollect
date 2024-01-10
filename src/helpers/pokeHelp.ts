import { Flavor_Text, Language, Pokemon, PokemonSpecies, PokemonType } from '../interfaces/PokedexInterfaces';
export const findTypeInLanguage = (language: string, types: PokemonType[]) => {
	let langTypes: PokemonType[] = [];

	for (let i = 0; i < types.length; i++) {
		let lang = types[i].names.find((name) => name.language.name === language);
		if (lang) {
			let translatedType: PokemonType = { ...types[i], name: lang?.name };
			langTypes.push(translatedType);
		}
	}
	return langTypes;
};

export const findDescInLanguage = (language: string, descs: Flavor_Text[]) => {
	return descs.find((entries) => entries.language.name === language);
}

export const findSpeciesById = (pokemonSpecies: PokemonSpecies, lang: string) => {
	return pokemonSpecies.flavor_text_entries.find((fte) => fte.language.name === lang);
	//return pokemonSpecies.find((specie) => specie.id === pokemon.id)?.flavor_text_entries.find((entry) => entry.language.name === lang)?.flavor_text
}

export const pokemonNameFix = (name: string) => {
	switch (name) {
		case "Nidoran-f":
			return "Nidoran";
		case "Nidoran-m":
			return "Nidoran";
		case "Oricorio-baile":
			return "Oricorio";
		case "Lycanroc-midday":
			return "Lycanroc";
		case "Wishiwashi-solo":
			return "Wishiwashi";

		default:
			return name;
	}
};
