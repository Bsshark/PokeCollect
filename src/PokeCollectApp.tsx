import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProfilePage } from "./Pages/ProfilePage";
import { PokedexPage } from "./Pages/PokedexPage";
export const PokeCollectApp = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/profile" element={<ProfilePage />}></Route>
				<Route path="/pokedex" element={<PokedexPage />}></Route>
			</Routes>
			Poke collect app
		</>
	);
};
