import { useEffect, useState } from "react";
import "./PokeFilter.css";
import { PokeFilterArrowPage } from "./PokeFilterArrowPage";
import { usePokeStore } from "../../hooks/usePokeStore";

export interface PokeFilterPaginationProps {
	isLoading: boolean;
	search: string;
	firstLoad: boolean;
	typeFilter: string;
}

export const PokeFilterPagination = ({
	isLoading,
	search,
	firstLoad,
	typeFilter
}: PokeFilterPaginationProps) => {
	const { from } = usePokeStore();
	const [page, setPage] = useState(Math.floor((from + 8) / 9));
	const [pagesToShow, setPagesToShow] = useState([1,2,3,4,5]);

	useEffect(() => {
	  calcularPaginacion(page);
	}, [page])
	

	const calcularPaginacion = (currentPage: number) => {
		var pagesArray = [];
		for (let i = -2, j = 0; j < 5; i++) {
			if (currentPage + i > 0) {
				pagesArray.push(Math.ceil(currentPage + i));
			} else {
				j--;
			}
			j++;
		}
		setPagesToShow(pagesArray);
	}


	return (
		<nav className="flex">
			<ul className="d-flex inline">
				<PokeFilterArrowPage
					isLoading={isLoading}
					search={search}
					arrowDirection="left"
					pagination={-1}
					firstLoad={firstLoad}
					setPage={setPage}
					page={page}
					typeFilter={typeFilter}
				></PokeFilterArrowPage>
				{pagesToShow?pagesToShow.map((pageText) => (
					<li className={`paginationItem ${search?'fa-disabled':'cursor'} ${page===pageText?'active':''}`} key={pageText}>
						<a className="page-link" onClick={() => search?() => {}:setPage(pageText)}>
							{pageText}
						</a>
					</li>
				)): ''}
				<PokeFilterArrowPage
					isLoading={isLoading}
					search={search}
					arrowDirection="right"
					pagination={1}
					firstLoad={firstLoad}
					setPage={setPage}
					page={page}
					typeFilter={typeFilter}
				></PokeFilterArrowPage>
			</ul>
		</nav>
	);
};
