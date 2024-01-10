import { useEffect } from "react";
import { usePokeStore } from "../hooks/usePokeStore";
import { PokeCard } from "./PokeCard";
import { animated, useSpring } from "@react-spring/web";

export const PokedexComponent = () => {
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
									desc={poke.desc}
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
