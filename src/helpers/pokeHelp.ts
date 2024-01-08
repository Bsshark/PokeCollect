import { Name, PokemonType } from "../interfaces/PokedexInterfaces";
export const findTypeInLanguage = (language: string, types: PokemonType[]) => {
	let langTypes: PokemonType[] = [];

	for (let i = 0; i < types.length; i++) {
		let lang = types[i].names.find((name) => name.language.name === language);
		if (lang) {
			let translatedType: PokemonType = { ...types[i], name: lang?.name };
			langTypes.push(translatedType);
		}
	}

	/* let i = 0;
	types.forEach((pokemonType) => {
		let lang = pokemonType.names.find(
			(name) => name.language.name === language
		);
		if (lang) {
			langTypes = [...pokemonType];
		}
	}); */
	return langTypes;
};

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
