import { ChangeEvent, useEffect, useRef, useState } from "react";
import { usePokeStore } from "../../hooks/usePokeStore";
import { PokeFilterSearch } from "./PokeFilterSearch";
import { PokeFilterPagination } from "./PokeFilterPagination";
import { OrderBy } from "../OrderBy";

export const PokeFilter = () => {
	const debounceRef = useRef<NodeJS.Timeout>();
	const { startLoadingPokes, isLoading, types } = usePokeStore();

	const [search, setSearch] = useState("");
	const [filter, setfilter] = useState("Tipo")

	const [firstLoad, setFirstLoad] = useState(true);

	debounceRef.current = setTimeout(() => {
		setFirstLoad(false);
	}, 1000);

	useEffect(() => {
		if (!search && firstLoad) return;
		if ((search.length < 1 || search.length > 3) && !firstLoad && !isLoading) {
			onSearch(search);
		}
	}, [search, filter]);

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const onSearch = (query: string) => {
		if (debounceRef.current) clearTimeout(debounceRef.current);

		debounceRef.current = setTimeout(() => {
			//todo: buscar
			startLoadingPokes(query, undefined, undefined, filter!=="Tipo"?filter:'');
		}, 1000);
	};

	const onFilterChange = (value: string) => {
		setfilter(value);
		
	}

	return (
		<nav className="navbar navbar-expand-sm">
			<div className="container">
				<div className="mr-auto d-flex">
					<PokeFilterPagination
						isLoading={isLoading}
						firstLoad={firstLoad}
						search={search}
						typeFilter={filter}
					/>
				</div>
				<div className="ms-auto col-md-6 row">
					{/* <i className="bi bi-x-square-fill h5 pt-2 col-1" onClick={deleteSearchBar}></i> */}
					<div className="col-md-6">
						<PokeFilterSearch onSearchChange={onSearchChange} search={search} />
					</div>
					<div className="col-md-6">
						<OrderBy values={types.map((type)=> type.name)} defaultValue={"Tipo"} setFilter={onFilterChange}/>
					</div>
				</div>
			</div>
		</nav>
	);
};
