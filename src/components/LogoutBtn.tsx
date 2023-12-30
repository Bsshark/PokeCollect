import { useAuthStore } from "../hooks/useAuthStore";

export const LogoutBtn = () => {
	const { startLogout } = useAuthStore();

	const handleLogout = () => {
		startLogout();
	};

	return (
		<button className="btn btn-primary" onClick={handleLogout}>
			Logout
		</button>
	);
};
