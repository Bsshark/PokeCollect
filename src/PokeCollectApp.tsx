import { Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ProfilePage } from "./Pages/ProfilePage";
import { PokedexPage } from "./Pages/PokedexPage";
import { CollectionPage } from "./Pages/CollectionPage";
import { EncounterPage } from "./Pages/EncounterPage";
export const PokeCollectApp = () => {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/profile" element={<ProfilePage />}></Route>
				<Route path="/pokedex" element={<PokedexPage/>}></Route>
				<Route path="/collection" element={<CollectionPage />}></Route>
				<Route path="/encounter" element={<EncounterPage />}></Route>
				<Route path="/*" element={<Navigate to="/pokedex" />} />
			</Routes>
		</>
	);
};
