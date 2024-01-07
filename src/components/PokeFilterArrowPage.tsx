import { useEffect, useState } from "react";
import { usePokeStore } from "../hooks/usePokeStore";
import { PokeFilterArrowPageProps } from "../interfaces/componentsInterfaces";



export const PokeFilterArrowPage = ({search, isLoading, arrowDirection, pagination, firstLoad}: PokeFilterArrowPageProps) => {

	const { startLoadingPokes, from, limit } = usePokeStore();

    const [hoverArrow, setHoverArrow] = useState(false);
	const [page, setPage] = useState(from);

    const toggleHover = () => setHoverArrow(!hoverArrow);

	let disableForLeft = false;
	arrowDirection === 'left'?disableForLeft = true: disableForLeft= false;

	useEffect(() => {
		if (!page) return;
		if (!firstLoad) {
			startLoadingPokes(undefined, limit, page);
		}
	}, [page]);

	useEffect(() => {
		if ("from" in localStorage) {
			setPage(Number(localStorage.getItem("from")));
		}
	}, [from]);

	

	const handlePagination = (pageTo: number) => {
		if ((page < 2  && pageTo < 0) || search.length > 0 || isLoading) return;
		setPage(page + pageTo);
	};

	return (
		<div className="">
			<i
				className={`bi ${
					hoverArrow && search.length < 1
						? `bi-arrow-${arrowDirection}-square-fill`
						: `bi-arrow-${arrowDirection}-square`
				}
							${search.length > 0 || isLoading || (disableForLeft && page < 2) ? "fa-disabled" : "cursor"} px-2 h3`}
				onMouseEnter={toggleHover}
				onMouseLeave={toggleHover}
				onClick={() => handlePagination(pagination)}
			></i>
		</div>
	);
};
