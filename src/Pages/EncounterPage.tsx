import { useEffect } from "react";
import { LoadingComponent } from "../components";
import { EncounterComponent } from "../components/EncounterComponent";
import { useEncounterStore } from "../hooks/useEncounterStore";

export const EncounterPage = () => {
	const { isLoading, startLoadingPokemon } = useEncounterStore();

	useEffect(() => {
		startLoadingPokemon();
	}, []);

	return (
		<div className="container justify-content-center flex-column">
			<div className="h1 titlePokedex flex-row text-center">Capturar</div>
			{isLoading ? (
				<>
					<LoadingComponent />
				</>
			) : (
				<>
					<EncounterComponent />
				</>
			)}
		</div>
	);
};
