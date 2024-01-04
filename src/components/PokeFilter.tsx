import { ChangeEvent, useRef } from "react";
import { usePokeStore } from "../hooks/usePokeStore";



export const PokeFilter = () => {
  const debounceRef = useRef<NodeJS.Timeout>();
  const { startLoadingPokes } = usePokeStore();


	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

		debounceRef.current = setTimeout(() => {
			//todo: buscar
      startLoadingPokes(e.target.value);
		}, 1000);
	};

	return (
		<nav className="navbar navbar-expand-sm">
			<div className="container">
				<div className="mr-auto"></div>
				<div className="ms-auto">
					<div>
						<input
							className="form-control mr-sm-2"
							type="search"
							placeholder="Búsqueda"
							aria-label="Search"
              onChange={onSearchChange}
						/>
					</div>
				</div>
			</div>
		</nav>
	);
};
