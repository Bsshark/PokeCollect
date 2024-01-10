import { useEffect } from "react";
import { LoadingComponent } from "../components";
import { PokeFilter } from "../components/PokeFilterComponents/PokeFilter";
import { PokedexComponent } from "../components/PokedexComponent";
import { usePokeStore } from "../hooks/usePokeStore";

export const PokedexPage = () => {
	const {
		startLoadingPokes,
		startLoadingTypes,
		isLoading,
	} = usePokeStore();

	useEffect(() => {
		startLoadingPokes();
	}, []);

	useEffect(() => {
		startLoadingTypes();
	}, []);

	return (
		<div className="container pokedex justify-content-center flex-column">
			<div className="h1 titlePokedex flex-row text-center">Pokédex</div>
			<div className="flex-row">
				<PokeFilter />
			</div>
			{isLoading ? (
				<>
					<LoadingComponent />
				</>
			) : (
				<>
					<div className="flex-row">
						<PokedexComponent />
					</div>
				</>
			)}
		</div>
	);
};
