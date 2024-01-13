import { useEffect, useState } from "react";
import { LoadingComponent } from "..";
import { useEncounterStore } from "../../hooks/useEncounterStore";
import { EncounterPokemon } from "./EncounterPokemon";
import { checkCanPass } from '../../helpers/pokeHelp';
import { useAuthStore } from "../../hooks";

export const EncounterComponent = () => {
	const { isCaptured, isLoading, pokemon, startLoadingPokemon,startCatchingPokemon } =
		useEncounterStore();
	const { user } = useAuthStore();

	const [canPass, setCanPass] = useState(false);
	const [isShiny, setIsShiny] = useState(false);

	var intervalCheckCatch;


	useEffect(() => {
		if(isLoading) {
			clearInterval(intervalCheckCatch!);
		}
		intervalCheckCatch = setInterval(() => setCanPass(checkCanPass()), 5000);
	}, [isLoading])

	useEffect(() => {
		if(!("isShiny" in localStorage)) return;
		setIsShiny(JSON.parse(localStorage.getItem("isShiny")!));
	}, [])
	
	

	useEffect(() => {
		setCanPass(checkCanPass())
	}, [])
	
	const handleShiny = () => {
		const shinyRandom = Math.round(Math.random() * (4000 - 1 + 1) + 1);
		if(shinyRandom < 3000) {
			setIsShiny(true);
		}else {
			setIsShiny(false);
		}
	}


	return (
		<div className="container col-md-12">
			<div className="row justify-content-center">
				{isLoading ? (
					<LoadingComponent />
				) : (
					<EncounterPokemon
						currentPokemon={pokemon}
						isCaptured={isCaptured}
						isShiny={isShiny}
					/>
				)}
			</div>
			<div className="row justify-content-center">
				<button
					type="button"
					className={`btn btn-outline-dark col-sm-2 ${
						isLoading || !canPass ? "disabled" : ""
					}`}
					onClick={() => { startLoadingPokemon(true),setCanPass(checkCanPass(true)), handleShiny()}}
				>
					<i className="bi bi-shuffle text-center"></i>
				</button>
				<span className="py-2"></span>
				<button type="button" className={`btn btn-outline-dark col-sm-2`} onClick={() =>startCatchingPokemon({...pokemon, isShiny, date_caught: new Date()}, user)}>Capturar</button>
				{/* <div className="col-sm-2 shuffle-icon align-items-center text-center">
					<i className="bi bi-shuffle text-center "></i>
				</div> */}
			</div>
		</div>
	);
};
