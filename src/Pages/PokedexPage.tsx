import { PokeFilter } from "../components/PokeFilter";
import { PokedexComponent } from "../components/PokedexComponent";

export const PokedexPage = () => {
	return (
		<div className="container pokedex justify-content-center flex-column">
			<div className="h1 titlePokedex flex-row text-center">Pokédex</div>
			<div className="flex-row">
				<PokeFilter />
			</div>

			<div className="flex-row">
				<PokedexComponent />
			</div>
		</div>
	);
};
