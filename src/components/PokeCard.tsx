import { findTypeInLanguage } from "../helpers/pokeHelp";
import { usePokeStore } from "../hooks/usePokeStore";
import { PokemonCardInfo } from "../interfaces";

export const PokeCard = (props: PokemonCardInfo) => {
	const { types: allTypes } = usePokeStore();

	const { name, sprite, types } = props;
	const pokeDisplayName = name!.charAt(0).toUpperCase() + name?.slice(1);

	const typesTranslated = findTypeInLanguage(
		"es",
		allTypes,
		types ? types : []
	);
	let typesTranslatedPokemon: number[] = [];

	if (types) {
		/* console.log(typesTranslated);
		console.log(allTypes);
		console.log(types[0].type.name)
		console.log(types[1]?.type.name) */

		for (let i = 0; i < allTypes.length; i++) {
			if (types[0].type.name === allTypes[i].name) {
				typesTranslatedPokemon.push(i);
			} else if (types[1]?.type.name === allTypes[i].name) {
				typesTranslatedPokemon.push(i);
			}
		}
		console.log(typesTranslated[typesTranslatedPokemon[0]]);
		//console.log(types.find((types) => types.type.name === allTypes[0].name));
	}

	return (
		<>
			<div className="pokemonCard" style={{ border: "1px solid black" }}>
				<div className="h5 text-center">{pokeDisplayName}</div>
				<div className="row">
					<div className="col-4 pb-2">
						{sprite ? (
							<img src={sprite} alt="" style={{ height: "8em" }} />
						) : (
							<div></div>
						)}
					</div>
					<div className="col-8 row">
						{typesTranslatedPokemon.map((i) => (
							<div className="col-4">
								{typesTranslatedPokemon.length > 0
									? typesTranslated[i].name
									: ""}
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
