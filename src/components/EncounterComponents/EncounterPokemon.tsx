import PokeballIcon from "../../assets/pokeball.png";
import { Pokemon, Sprites } from "../../interfaces/PokedexInterfaces";

import MissingSprite from '../../assets/missingSprite.png';
import { useEffect, useState } from "react";
import { pokemonNameFix } from "../../helpers/pokeHelp";

interface EncounterPokemonProps {
	currentPokemon: Pokemon;
	isCaptured: boolean;
}

export const EncounterPokemon = ({ currentPokemon, isCaptured }: EncounterPokemonProps) => {

	const [displayName, setDisplayName] = useState(currentPokemon.name)

	useEffect(() => {
	  pokemonNameFix(currentPokemon.id).then((res) => {
		setDisplayName(res?.name?res?.name:currentPokemon.name);
	  })
	}, [])
	

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
					src={currentPokemon.sprites.front_default?currentPokemon.sprites.front_default:MissingSprite}
					style={{ objectFit: "contain", maxWidth: "100%", height: "2em" }}
				/>
			</div>
		</>
	);
};
