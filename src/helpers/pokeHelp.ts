import {
	Flavor_Text,
	PokemonSpecies,
	PokemonType,
} from "../interfaces/PokedexInterfaces";
import Papa from "papaparse";
import { itemNamesCsv } from "../interfaces/csvInterfaces";

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
};

export const findSpeciesById = (
	pokemonSpecies: PokemonSpecies,
	lang: string
) => {
	return pokemonSpecies.flavor_text_entries.find(
		(fte) => fte.language.name === lang
	);
	//return pokemonSpecies.find((specie) => specie.id === pokemon.id)?.flavor_text_entries.find((entry) => entry.language.name === lang)?.flavor_text
};

export const isCaptured = (
	catchRate: number,
	ballRate: number,
	status: string
) => {
	//Capture Rate = [(1÷ MaxHP × 3) + ((CatchRate × BallRate × Status#) ÷ 3)] ÷ 256
	const chance = calculateChance(catchRate, ballRate, status);
	console.log(`chance: ${chance}`);
};

async function fetchCsv() {
	const response = await fetch("pokemon_names.csv");
	const reader = response.body!.getReader();
	const result = await reader.read();
	const decoder = new TextDecoder("utf-8");
	const csv = await decoder.decode(result.value);
	return csv;
}

export const pokemonNameFix = async (id: number) => {
	if (!("pkm_names" in localStorage)) {
		const data = Papa.parse<itemNamesCsv>(await fetchCsv(), {
			header: true,
		}).data;
		localStorage.setItem(
			"pkm_names",
			JSON.stringify(data.filter((item) => item.local_language_id === "7"))
		);
	}

	const names: itemNamesCsv[] = JSON.parse(localStorage.getItem("pkm_names")!);

	return names.find((item) => item.pokemon_species_id === id.toString());
};

export const setIdToType = (types: PokemonType[], dbTypes: PokemonType[]) => {
	let typesWithId: PokemonType[] = [];
	for (let i = 0; i < types.length; i++) {
		if (types[i].id && !dbTypes) return;
		const newId = dbTypes.find((type) => type.name === types[i].name)?.id;
		if (newId) {
			typesWithId.push({ ...types[i], id: newId });
		}
	}
	return typesWithId;
};

export const checkCanPass = (isPassing?: boolean) => {
	const currentDate = new Date();
	const tiempoEsperaEnSegs = 5;

	if ("dateNextPass" in localStorage) {
		const dateNextPass: Date = JSON.parse(
			localStorage.getItem("dateNextPass")!
		);
		if (new Date(dateNextPass).getTime() < currentDate.getTime()) {
			//La fecha actual es superior a la de caché
			if (!isPassing) {
				localStorage.removeItem("dateNextPass");
				return true;
			}
		} else {
			return false;
		}
	}

	if (isPassing) {
		localStorage.setItem(
			"dateNextPass",
			JSON.stringify(
				currentDate.setSeconds(currentDate.getSeconds() + tiempoEsperaEnSegs)
			)
		);
		return false;
	}

	return true;
};

export const calculateChance = (
	catchRate: number,
	ballRate: number,
	status: string
) => {
	return ((catchRate * ballRate * chanceByStatus(status)) / 3) % 256;
};

const chanceByStatus = (status: string) => {
	switch (status) {
		case "Freeze":
			return 1.2;
		case "Sleep":
			return 1.2;
		case "Paralysis":
			return 1.1;
		case "Burn":
			return 1.1;
		case "Poison":
			return 1.1;
		default:
			return 1;
	}
};
