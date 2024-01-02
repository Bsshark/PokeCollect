import { useEffect } from "react";
import { usePokeStore } from "../hooks/usePokeStore";
import { PokeCard } from "./PokeCard";

export const PokedexComponent = () => {
	const { startLoadingPokes, startLoadingTypes, pokemonShown, isLoading } = usePokeStore();

	useEffect(() => {
		startLoadingPokes();
	}, []);

    useEffect(() => {
        startLoadingTypes();
    }, [])
    

	return (
		<>
			<div className="container">
				<div className="row gx-5">
					{!isLoading && pokemonShown.length > 0 ? (
						pokemonShown.map((poke) => (
							<div className="col-lg-4 p-3" key={poke.id}>
								{/* poke.name.charAt(0).toUpperCase() + poke.name.slice(1) */}
								<PokeCard
									name={poke.name}
									id={poke.id}
									sprite={poke.sprites.front_default}
									types={poke.types}
								/>
							</div>
						))
					) : (
						<div></div>
					)}
				</div>
			</div>
		</>
	);
};
