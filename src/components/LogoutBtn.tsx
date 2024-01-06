import { useAuthStore } from "../hooks/useAuthStore";

export const LogoutBtn = () => {
	const { startLogout } = useAuthStore();

	const handleLogout = () => {
		startLogout();
	};

	return (
		<div className="d-flex cursor">
			<i className="bi bi-box-arrow-right h2 pt-1" onClick={handleLogout}></i>
		</div>
	);
};
