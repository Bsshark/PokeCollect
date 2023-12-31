import { NavLink } from "react-router-dom";
import { NavPokemonItemProps } from "../interfaces/componentsInterfaces";

export const NavPokemonItem = (props: NavPokemonItemProps): JSX.Element => {
    const { alt, isMobile, src, to } = props;
	return (
		<li className="nav-item py-2 mx-1">
			<NavLink to={to} style={{ textDecoration: "none" }} className="px-2">
				<img src={src} alt={alt} style={{ height: "3em" }} />
				<span>{isMobile ? "" : alt}</span>
			</NavLink>
		</li>
	);
};
