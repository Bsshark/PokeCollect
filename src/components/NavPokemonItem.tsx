import { NavLink } from "react-router-dom";
import { NavPokemonItemProps } from "../interfaces/componentsInterfaces";

export const NavPokemonItem = (props: NavPokemonItemProps): JSX.Element => {
    const { alt, isMobile, src, to } = props;
	return (
		<li className="nav-item">
			<NavLink to={to} style={{ textDecoration: "none", height: "inherit" }} className="mx-1 px-2 py-2 navItemLink">
				<img src={src} alt={alt} style={{ height: "3em" }} />
				<span>{isMobile ? "" : alt}</span>
			</NavLink>
		</li>
	);
};
