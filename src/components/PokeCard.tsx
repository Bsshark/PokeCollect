import { findTypeInLanguage } from "../helpers/pokeHelp";
import { usePokeStore } from "../hooks/usePokeStore";
import { PokemonCardInfo } from "../interfaces";

import "./PokeCard.scss";

export const PokeCard = (props: PokemonCardInfo) => {
	const { types: allTypes } = usePokeStore();

	const { name, sprite, types } = props;
	const pokeDisplayName = name!.charAt(0).toUpperCase() + name?.slice(1);

	const typesTranslated = findTypeInLanguage("es", allTypes);
	let typesTranslatedPokemon: number[] = [];

	if (types) {

		for (let i = 0; i < allTypes.length; i++) {
			if (types[0].type.name === allTypes[i].name) {
				typesTranslatedPokemon.push(i);
			} else if (types[1]?.type.name === allTypes[i].name) {
				typesTranslatedPokemon.push(i);
			}
		}
	}

	return (
		<>
			<div className="pokemonCard">
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
						{typesTranslatedPokemon.map((i) =>
							typesTranslatedPokemon.length > 0 ? (
								<div className={`col-4 pkm-type ${allTypes[i].name}`} key={i}>
									<span>{typesTranslated[i].name}</span>
								</div>
							) : (
								""
							)
						)}
					</div>
				</div>
			</div>
		</>
	);
};
