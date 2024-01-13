import { PokemonCardInfo } from "../interfaces";

import "./PokeCard.scss";
import missingSprite from "../assets/missingSprite.png";
import { usePokeStore } from "../hooks/usePokeStore";
import { LoadingComponent } from ".";
import { setIdToType } from "../helpers/pokeHelp";

export const PokeCard = ({
	isLoading,
	name,
	sprite,
	types,
	id,
	desc,
	showData = true,
	caught_date,
}: PokemonCardInfo) => {
	const pokeDisplayName = name!.charAt(0).toUpperCase() + name?.slice(1);
	const { types: allTypes, dbTypes } = usePokeStore();


	/* const typesTranslated = findTypeInLanguage("es", types);
	console.log(typesTranslated); */

	return (
		<>
			{isLoading ? (
				<LoadingComponent />
			) : (
				<div className="pokemonCard">
					<div className="h5 text-center">
						{id}. {pokeDisplayName}
					</div>
					<div className="row">
						<div className={`col-${showData ? 4 : 6} pb-2 text-center`}>
							{
								<img
									src={sprite ? sprite : missingSprite}
									alt=""
									style={{ height: "8em" }}
								/>
							}
						</div>
						<div className={`col-${showData ? 8 : 6} row`}>
							<div className="col-12 row">
								{setIdToType(types, dbTypes)!.map((type, index) =>
									types.length > 0 ? (
										<div
											className={`col-sm-4 pkm-type ${type.name}`}
											key={index}
										>
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
							{showData ? (
								<div className="col-12 row desc">
									{desc ? desc : "Descripción no encontrada"}
								</div>
							) : (
								<></>
							)}
							{caught_date ? (
								<div className="col-12 row">
									Capturado en: <br /><span className="text-muted font-monospace">{new Date(caught_date!).toLocaleDateString('es-es', {year:"numeric", month:"long", day:"numeric", hour: "numeric", minute:"numeric"})}</span>
								</div>
							) : (
								<></>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};
