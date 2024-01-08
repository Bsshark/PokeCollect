import { useEffect, useState } from "react";
import { PokeFilterArrowPageProps } from "../../interfaces/componentsInterfaces";
import { usePokeStore } from "../../hooks/usePokeStore";

export const PokeFilterArrowPage = ({
	search,
	isLoading,
	arrowDirection,
	pagination,
	firstLoad,
	setPage,
	page,
}: PokeFilterArrowPageProps) => {
	const { startLoadingPokes, limit } = usePokeStore();

	const [hoverArrow, setHoverArrow] = useState(false);
	

	const toggleHover = () => setHoverArrow(!hoverArrow);

	let disableForLeft = false;
	arrowDirection === "left"
		? (disableForLeft = true)
		: (disableForLeft = false);

	let disableForRight = false;
	arrowDirection === "right"
		? (disableForRight = true)
		: (disableForRight = false);

	useEffect(() => {
		if (!page) return;
		if (!firstLoad) {
			const newFrom = ((page*9)-9)===0?1:((page*9)-9);
			console.log(`newFrom: ${newFrom}`)
			startLoadingPokes(undefined, limit, newFrom);
		}
	}, [page]);

	useEffect(() => {
		if ("from" in localStorage) {
			const currentFrom = Number(localStorage.getItem("from"));
			console.log(`currentFrom: ${currentFrom}`)
			setPage(currentFrom>1?(currentFrom/9)+1:currentFrom);
		}
	}, []);

	const handlePagination = (pageTo: number) => {
		if (
			(page < 2 && pageTo < 0) ||
			search.length > 0 ||
			(page >= ((1025+8)/9) - limit && pageTo > 0) ||
			isLoading
		)
			return;
			
		setPage(page + pageTo);
	};

	return (
			<i
				className={`bi ${
					hoverArrow && search.length < 1
						? `bi-arrow-${arrowDirection}-square-fill`
						: `bi-arrow-${arrowDirection}-square`
				}
							${
								search.length > 0 ||
								isLoading ||
								(disableForLeft && page < 2) ||
								(disableForRight && page >= ((1025+8)/9) - limit)
									? "fa-disabled"
									: "cursor"
							} px-2 h3`}
				onMouseEnter={toggleHover}
				onMouseLeave={toggleHover}
				onClick={() => handlePagination(pagination)}
			></i>
	);
};
