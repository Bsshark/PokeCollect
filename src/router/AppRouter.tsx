import { Navigate, Route, Routes } from "react-router-dom";
import { useCheckAuth } from "../hooks/useCheck";
import { authenticatedStatus, checkingStatus } from "../helpers";
import { PokeCollectApp } from "../PokeCollectApp";
import { LoginScreen } from "../Pages/LoginScreen";

export const AppRouter = () => {
	const status = useCheckAuth();
	console.log(status);

	if (status === checkingStatus) {
		return <div>Not auth</div>;
		//TODO: Checking auth component
	}

	return (
		<Routes>
			{status === authenticatedStatus ? (
				<Route path="/*" element={<PokeCollectApp />} />
			) : (
				<Route path="/auth/*" element={<LoginScreen />} />
			)}

			<Route path="/*" element={<Navigate to="/auth/login" />} />
		</Routes>
	);
};
