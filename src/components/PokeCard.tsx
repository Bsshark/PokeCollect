import { pokemonNameFix } from "../helpers/pokeHelp";
import { PokemonCardInfo } from "../interfaces";

import "./PokeCard.scss";
import missingSprite from "../assets/missingSprite.png";
import { usePokeStore } from "../hooks/usePokeStore";

export const PokeCard = ({
	name,
	sprite,
	types,
	id,
	desc,
}: PokemonCardInfo) => {
	const pokeDisplayName = name!.charAt(0).toUpperCase() + name?.slice(1);
	const { types: allTypes, dbTypes } = usePokeStore();

	let displayTypes = [];
	for (let i = 0; i < types.length; i++) {
		if (types[i].id && !dbTypes) return;
		const newId = dbTypes.find((type) => type.name === types[i].name)?.id;
		if (newId) {
			displayTypes.push({ ...types[i], id: newId });
		}

		//console.log(`tipo ${i} | ${a?.name}`)
	}

	/* const typesTranslated = findTypeInLanguage("es", types);
	console.log(typesTranslated); */

	return (
		<>
			<div className="pokemonCard">
				<div className="h5 text-center">
					{id}. {pokemonNameFix(pokeDisplayName)}
				</div>
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
						<div className="col-12 row">
							{displayTypes.map((type) =>
								types.length > 0 ? (
									<div className={`col-sm-4 pkm-type ${type.name}`} key={type.id}>
										<span>
											{
												allTypes.find((findType) => findType.id === type.id)
													?.name
											}
										</span>
									</div>
								) : (
									""
								)
							)}
						</div>
						<div className="col-12 row desc">{desc?desc:'Descripción no encontrada'}</div>
					</div>
				</div>
			</div>
		</>
	);
};
