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
	const [page, setPage] = useState((from+8)/9);

	const pagesToShow = [];
	for (let i = -2; i <= 2; i++) {
		if ((page+i) > 0) {
			pagesToShow.push(page + i);
		}
	}

	return (
		<nav className="flex">
			<ul className="d-flex inline">
				<li className="page-item">
					<PokeFilterArrowPage
						isLoading={isLoading}
						search={search}
						arrowDirection="left"
						pagination={-1}
						firstLoad={firstLoad}
						setPage={setPage}
						page={page}
					></PokeFilterArrowPage>
				</li>
				{pagesToShow.map((page) => (
					<li className="paginationItem" key={page}>
						<a className="page-link cursor" onClick={() => console.log(page)}>
							{page}
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
