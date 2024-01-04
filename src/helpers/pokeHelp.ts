import { RootTypes, Name } from "../interfaces/pokemonInterfaces";
export const findTypeInLanguage = (
	language: string,
	types: RootTypes[]
) => {
	const langTypes: Name[] = [];
	types.forEach((rootType) => {
		let lang = rootType.names.find((name) => name.language.name === language);
		if (lang) {
			langTypes.push(lang);
		}
	});
    return langTypes;
};
