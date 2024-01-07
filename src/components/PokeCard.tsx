import { findTypeInLanguage, pokemonNameFix } from '../helpers/pokeHelp';
import { usePokeStore } from "../hooks/usePokeStore";
import { PokemonCardInfo } from "../interfaces";

import "./PokeCard.scss";
import missingSprite from "../assets/missingSprite.png";

export const PokeCard = (props: PokemonCardInfo) => {
	const { types: allTypes } = usePokeStore();

	const { name, sprite, types } = props;
	const pokeDisplayName = name!.charAt(0).toUpperCase() + name?.slice(1);

	const typesTranslated = findTypeInLanguage("es", allTypes);
	let typesTranslatedPokemon: number[] = [];
	if (types) {
		for (let i = 0; i < types.length; i++) {
			for (let j = 0; j < allTypes.length; j++) {
				if(allTypes[j].name === types[i].name) {
					typesTranslatedPokemon.push(j);
				}
			}
		}

		/* for (let i = 0; i < allTypes.length; i++) {
			if (types[0].name === allTypes[i].name) {
				typesTranslatedPokemon.push(i);
			} else if (types[1]?.name === allTypes[i].name) {
				typesTranslatedPokemon.push(i);
			}
		} */
	}

	return (
		<>
			<div className="pokemonCard">
				<div className="h5 text-center">{pokemonNameFix(pokeDisplayName)}</div>
				<div className="row">
					<div className="col-4 pb-2">
						{
							<img
								src={sprite ? sprite : missingSprite}
								alt=""
								style={{ height: "8em" }}
							/>
						}
					</div>
					<div className="col-8 row">
						{typesTranslatedPokemon.map((type) =>
							typesTranslatedPokemon.length > 0 ? (
								<div
									className={`col-4 pkm-type ${allTypes[type].name}`}
									key={type}
								>
									<span>{typesTranslated[type].name}</span>
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
