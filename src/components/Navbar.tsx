import { useState } from "react";
import { LogoutBtn } from "./LogoutBtn";
import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import PokedexLogo from "./../assets/pokedex.png";
import PokeballNav from "./../assets/pokeball-nav.png";
import { useAppSelector } from "../hooks";
import { AuthState } from "../interfaces";
import { NavProfileIcon } from "./NavProfileIcon";
import { NavPokemonItem } from "./NavPokemonItem";

export const Navbar = () => {
	const { user }: AuthState = useAppSelector((state) => state.auth);

	const [isNavCollapsed, setIsNavCollapsed] = useState(true);
	const isMobile = useMediaQuery({ query: `(min-width: 576px)` });

	const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

	return (
		<nav className="navbar navbar-expand-sm navbar-fixed-top">
			<div className="container">
				<div className="navbar-brand">
					<NavLink className={"h3"} style={{ textDecoration: "none" }} to="/">
						PokéCollect
					</NavLink>
				</div>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded={!isNavCollapsed ? true : false}
					aria-label="Toggle navigation"
					onClick={handleNavCollapse}
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
					id="navbarSupportedContent"
				>
					<ul className="navbar-nav mr-auto nav-list-pokemon">
						<NavPokemonItem
							isMobile={isMobile}
							to="pokedex"
							src={PokedexLogo}
							alt="Pokédex"
						/>
						<NavPokemonItem
							isMobile={isMobile}
							to="collection"
							src={PokeballNav}
							alt="Colección"
						/>
					</ul>
					<ul className="navbar-nav ms-auto">
						<li className="nav-item px-2 py-2">
							<NavLink
								to="/profile"
								className={({ isActive, isPending }) =>
									isPending ? "pending" : isActive ? "active" : ""
								}
								style={{ textDecoration: "none", width: "100%" }}
							>
								{user.photoUrl ? (
									<NavProfileIcon user={user} isMobile={isMobile} />
								) : (
									<i
										className="bi bi-person-circle"
										style={{ fontSize: "1.5em" }}
									>
										<span style={{ paddingLeft: "0.3em" }}>
											{isMobile ? "" : "Perfil"}
										</span>
									</i>
								)}
							</NavLink>
						</li>
						<li className="nav-item px-2 py-2">
							<LogoutBtn />
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
