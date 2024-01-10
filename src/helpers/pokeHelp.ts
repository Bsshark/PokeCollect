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

export const isCaptured = (catchRate: number, ballRate: number, status: string) => {
	//Capture Rate = [(1÷ MaxHP × 3) + ((CatchRate × BallRate × Status#) ÷ 3)] ÷ 256
	const chance = calculateChance(catchRate, ballRate, status);
	console.log(`chance: ${chance}`);
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

const calculateChance = (catchRate: number, ballRate: number, status: string) => {
	return ((catchRate * ballRate * chanceByStatus(status))/ 3) % 256;
}

const chanceByStatus = (status: string) => {
	switch(status){
		case 'Freeze':
			return 2;
		case 'Sleep':
			return 2;
		case 'Paralysis':
			return 1.5;
		case 'Burn':
			return 1.5;
		case 'Poison':
			return 1.5;
		default:
			return 1;
	}
}