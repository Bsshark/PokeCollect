import { Navigate, Route, Routes } from "react-router-dom";
import { authenticatedStatus, checkingStatus } from "../helpers";
import { PokeCollectApp } from "../PokeCollectApp";
import { AuthRoutes } from "../routes/AuthRoutes";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";
import { LoadingComponent } from "../components/LoadingComponent";

export const AppRouter = () => {
	//const status = useCheckAuth();
	const { status, checkAuthToken } = useAuthStore();

	useEffect(() => {
		checkAuthToken();
	}, []);

	console.log(status);

	if (status === checkingStatus) {
		return <LoadingComponent />;
		//TODO: Checking auth component
	}

	return (
		<Routes>
			{status === authenticatedStatus ? (
				<Route path="/*" element={<PokeCollectApp />} />
			) : (
				<Route path="/auth/*" element={<AuthRoutes />} />
			)}

			<Route path="/*" element={<Navigate to="/auth/login" />} />
		</Routes>
	);
};
