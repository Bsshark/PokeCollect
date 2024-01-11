import PokeballIcon from "../../assets/pokeball.png";
import { Pokemon, Sprites } from "../../interfaces/PokedexInterfaces";

import MissingSprite from "../../assets/missingSprite.png";
import { useEffect, useState } from "react";
import { pokemonNameFix } from "../../helpers/pokeHelp";

interface EncounterPokemonProps {
	currentPokemon: Pokemon;
	isCaptured: boolean;
	isShiny: boolean;
}

export const EncounterPokemon = ({
	currentPokemon,
	isCaptured,
	isShiny,
}: EncounterPokemonProps) => {
	const [displayName, setDisplayName] = useState(currentPokemon.name);
	const [spriteSrc, setSpriteSrc] = useState(currentPokemon.sprites.front_shiny);

	useEffect(() => {
		pokemonNameFix(currentPokemon.id).then((res) => {
			setDisplayName(res?.name ? res?.name : currentPokemon.name);
		});
	}, []);

	useEffect(() => {
		if (isShiny)
			setSpriteSrc(
				currentPokemon.sprites.front_shiny
					? currentPokemon.sprites.front_shiny
					: MissingSprite
			);
		else
			setSpriteSrc(
				currentPokemon.sprites.front_default
					? currentPokemon.sprites.front_default
					: MissingSprite
			);
			localStorage.setItem("isShiny", JSON.stringify(isShiny));
	}, [isShiny]);

	return (
		<>
			<div className="h3 row justify-content-center">{displayName}</div>
			{isCaptured ? (
				<div className="h3">
					<img src={PokeballIcon} alt="" />
				</div>
			) : (
				<></>
			)}
			<div className="row align-items-center">
				<img
					src={spriteSrc}
					style={{ objectFit: "contain", maxWidth: "100%", height: "12em" }}
				/>
			</div>
		</>
	);
};
