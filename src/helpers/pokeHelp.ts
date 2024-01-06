import { Name, PokemonType } from "../interfaces/PokedexInterfaces";
export const findTypeInLanguage = (
	language: string,
	types: PokemonType[]
) => {
	const langTypes: Name[] = [];
	types.forEach((pokemonType) => {
		let lang = pokemonType.names.find((name) => name.language.name === language);
		if (lang) {
			langTypes.push(lang);
		}
	});
    return langTypes;
};
