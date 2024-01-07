import { ChangeEvent, useEffect, useRef, useState } from "react";
import { usePokeStore } from "../hooks/usePokeStore";
import { PokeFilterSearch } from "./PokeFilterSearch";
import { PokeFilterArrowPage } from "./PokeFilterArrowPage";

export const PokeFilter = () => {
	const debounceRef = useRef<NodeJS.Timeout>();
	const { startLoadingPokes, isLoading } = usePokeStore();

	const [search, setSearch] = useState("");

	const [firstLoad, setFirstLoad] = useState(true);

	debounceRef.current = setTimeout(() => {
		setFirstLoad(false);
	}, 1000);

	

	useEffect(() => {
		if (!search && firstLoad) return;
		if ((search.length < 1 || search.length > 3) && !firstLoad && !isLoading) {
			onSearch(search);
		}
	}, [search]);


	

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const onSearch = (query: string) => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

		debounceRef.current = setTimeout(() => {
			//todo: buscar
			startLoadingPokes(query);
		}, 1000);
	};

	return (
		<nav className="navbar navbar-expand-sm">
			<div className="container">
				<div className="mr-auto d-flex">
					<PokeFilterArrowPage
						isLoading={isLoading}
						search={search}
						arrowDirection="left"
						pagination={-9}
						firstLoad={firstLoad}
					></PokeFilterArrowPage>
					<PokeFilterArrowPage
						isLoading={isLoading}
						search={search}
						arrowDirection="right"
						pagination={9}
						firstLoad={firstLoad}
					></PokeFilterArrowPage>
				</div>
				<div className="ms-auto">
					<div className="container row">
						{/* <i className="bi bi-x-square-fill h5 pt-2 col-1" onClick={deleteSearchBar}></i> */}
						<div className="col-12">
							<PokeFilterSearch
								onSearchChange={onSearchChange}
								search={search}
							/>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
