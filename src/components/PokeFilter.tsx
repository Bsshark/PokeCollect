import { ChangeEvent, useEffect, useRef, useState } from "react";
import { usePokeStore } from "../hooks/usePokeStore";

export const PokeFilter = () => {
	const debounceRef = useRef<NodeJS.Timeout>();
	const { startLoadingPokes, limit, from } = usePokeStore();

	const [search, setSearch] = useState("");
	const [page, setPage] = useState(from);
	const [hoverArrowLeft, setHoverArrowLeft] = useState(false);
	const [hoverArrowRight, setHoverArrowRight] = useState(false);
	const [firstLoad, setFirstLoad] = useState(true);

	debounceRef.current = setTimeout(() => {
		//todo: buscar
		setFirstLoad(false);
	}, 1000);

	useEffect(() => {
		if ((search === "" || search.length > 2) && !firstLoad) {
			onSearch(search);
		}
	}, [search]);

	useEffect(() => {
		if (page && !firstLoad) {
			startLoadingPokes(undefined, limit, page);
		}
	}, [page]);

	useEffect(() => {
		setPage(from);
	}, [firstLoad]);

	const toggleHoverLeft = () => setHoverArrowLeft(!hoverArrowLeft);
	const toggleHoverRight = () => setHoverArrowRight(!hoverArrowRight);

	const handlePagination = (pageTo: number) => {
		if ((page <= 1 && pageTo < 1) || search.length > 0) return;
		setPage((prev) => prev + pageTo);
		setFirstLoad(false);
	};

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
					<div className="">
						<i
							className={`bi ${
								hoverArrowLeft && page > 1 && search.length < 1
									? "bi-arrow-left-square-fill"
									: "bi-arrow-left-square"
							} 
							${page < 2 || search.length > 0 ? "fa-disabled" : ""} px-2 h3 cursor`}
							onMouseEnter={toggleHoverLeft}
							onMouseLeave={toggleHoverLeft}
							onClick={() => handlePagination(-9)}
						></i>
					</div>
					<div className="">
						<i
							className={`bi ${
								hoverArrowRight && search.length < 1
									? "bi-arrow-right-square-fill"
									: "bi-arrow-right-square"
							}
							${search.length > 0 ? "fa-disabled" : ""} px-2 h3 cursor`}
							onMouseEnter={toggleHoverRight}
							onMouseLeave={toggleHoverRight}
							onClick={() => handlePagination(9)}
						></i>
					</div>
				</div>
				<div className="ms-auto">
					<div className="container row">
						{/* <i className="bi bi-x-square-fill h5 pt-2 col-1" onClick={deleteSearchBar}></i> */}
						<div className="col-12">
							<input
								className="form-control mr-sm-2"
								type="search"
								placeholder="Búsqueda"
								aria-label="Search"
								onChange={onSearchChange}
								value={search}
							/>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
