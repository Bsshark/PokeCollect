import { useState } from "react";
import "./PokeFilter.css";
import { PokeFilterArrowPage } from "./PokeFilterArrowPage";
import { usePokeStore } from "../../hooks/usePokeStore";

export interface PokeFilterPaginationProps {
	isLoading: boolean;
	search: string;
	firstLoad: boolean;
}

export const PokeFilterPagination = ({
	isLoading,
	search,
	firstLoad,
}: PokeFilterPaginationProps) => {
	const { from } = usePokeStore();
	const [page, setPage] = useState((from + 8) / 9);

	const pagesToShow = [];
	for (let i = -2, j = 0; j < 5; i++) {
		if (page + i > 0) {
			pagesToShow.push(page + i);
		} else {
			j--;
		}
		j++;
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
				></PokeFilterArrowPage>
				{pagesToShow.map((pageText) => (
					<li className={`paginationItem ${search?'fa-disabled':'cursor'} ${page===pageText?'active':''}`} key={pageText}>
						<a className="page-link" onClick={() => search?() => {}:setPage(pageText)}>
							{pageText}
						</a>
					</li>
				))}
				<PokeFilterArrowPage
					isLoading={isLoading}
					search={search}
					arrowDirection="right"
					pagination={1}
					firstLoad={firstLoad}
					setPage={setPage}
					page={page}
				></PokeFilterArrowPage>
			</ul>
		</nav>
	);
};
