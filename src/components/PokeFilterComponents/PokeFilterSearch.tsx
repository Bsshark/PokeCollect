import { PokeFilterSearchProps } from "../../interfaces/componentsInterfaces";

export const PokeFilterSearch = ({onSearchChange, search}: PokeFilterSearchProps) => {


	return (
		<input
			className="form-control mr-sm-2"
			type="search"
			placeholder="Búsqueda"
			aria-label="Search"
			onChange={onSearchChange}
			value={search}
		/>
	);
};
