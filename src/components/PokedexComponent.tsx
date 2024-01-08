import { useEffect } from "react";
import { usePokeStore } from "../hooks/usePokeStore";
import { PokeCard } from "./PokeCard";
import { animated, useSpring } from "@react-spring/web";
import { findTypeInLanguage } from "../helpers/pokeHelp";

export const PokedexComponent = () => {
	const { types: allTypes } = usePokeStore();

	const { pokemonShown, isLoading } = usePokeStore();

	const [springs, api] = useSpring(() => ({
		from: { opacity: 0 },
		to: { opacity: 1 },
	}));

	useEffect(() => {
		if (!isLoading) {
			api.start({
				from: { opacity: 0 },
				to: { opacity: 1 },
			});
		}
	}, [isLoading]);


	

	

	/* if (types) {
		for (let i = 0; i < types.length; i++) {
			for (let j = 0; j < allTypes.length; j++) {
				if(allTypes[j].name === types[i].name) {
					typesTranslatedPokemon.push(j);
				}
			}
		} */

		/* for (let i = 0; i < allTypes.length; i++) {
			if (types[0].name === allTypes[i].name) {
				typesTranslatedPokemon.push(i);
			} else if (types[1]?.name === allTypes[i].name) {
				typesTranslatedPokemon.push(i);
			}
		} 
	}*/

	return (
		<>
			<div className="container">
				<div className="row gx-5">
					{!isLoading && pokemonShown.length > 0 ? (
						pokemonShown.map((poke) => (
							<animated.div
								className="col-lg-4 p-3"
								key={poke.id}
								style={{ ...springs }}
							>
								{/* poke.name.charAt(0).toUpperCase() + poke.name.slice(1) */}
								<PokeCard
									name={poke.name}
									id={poke.id}
									sprite={poke.sprites.front_default}
									types={poke.types}
								/>
							</animated.div>
						))
					) : (
						<div></div>
					)}
				</div>
			</div>
		</>
	);
};
