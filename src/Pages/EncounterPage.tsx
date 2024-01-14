import { useEffect } from "react";
import { EncounterComponent } from "../components/EncounterComponents/EncounterComponent";
import { useEncounterStore } from "../hooks/useEncounterStore";
import { LoadingComponent } from "../components";

export const EncounterPage = () => {
	const { startLoadingPokemon, isLoading } = useEncounterStore();

	useEffect(() => {
		startLoadingPokemon();
	}, []);

	return (
		<div className="container justify-content-center flex-column">
			<div className="h1 titlePokedex flex-row text-center">Capturar</div>
			<hr />
			{
				isLoading?
				(<LoadingComponent/>)
				:(<EncounterComponent/>)
			}
		</div>
	);
};
