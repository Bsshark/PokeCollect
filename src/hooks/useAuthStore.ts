import { useAppDispatch, useAppSelector } from "./dispatch";
import {
	AuthLoginResponse,
	AuthRegisterResponse,
	AuthState,
	LoginUser,
	RegisterUser,
} from "../interfaces/authInterfaces";
import {
	onCheckingCredentials,
	clearErrorMessage,
	onLogin,
	onLogout,
} from "../store/auth/authSlice";
import authApi from "../api/authApi";
import { startCreatingUserWithEmailPassword } from "../store/auth/thunks";
import {
	errMsgCreateUser,
	errMsgCredentialsLogin,
	errMsgExpiredSession,
} from "../helpers/errorMessages";
import { toast } from "react-toastify";

export const useAuthStore = () => {
	const dispatch = useAppDispatch();

	const { status, user, errorMessage }: AuthState = useAppSelector(
		(state) => state.auth
	);

	const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

	const startLogin = async ({ email, password }: LoginUser) => {
		dispatch(onCheckingCredentials());

		await delay(500);

		try {
			const { data } = await authApi.post<AuthLoginResponse>("/auth", {
				email,
				password,
			});
			localStorage.setItem("token", data.token);
			localStorage.setItem("token-init-date", new Date().getTime().toString());
			dispatch(
				onLogin({
					user: {
						displayName: data.name,
						uid: data.uid,
						email: email,
						photoUrl: data.photoUrl,
					},
				})
			);
			localStorage.setItem("user-email", email);
			localStorage.setItem("user-photo-url", data.photoUrl);
		} catch (error) {
			dispatch(onLogout({ errorMessage: errMsgCredentialsLogin }));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const startRegister = async ({
		displayName,
		email,
		password,
	}: RegisterUser) => {
		dispatch(onCheckingCredentials());
		try {
			const { data } = await authApi.post<AuthRegisterResponse>("auth/new", {
				name: displayName,
				email,
				password,
			});
			localStorage.setItem("token", data.token);
			localStorage.setItem("token-init-date", new Date().getTime().toString());
			dispatch(
				startCreatingUserWithEmailPassword({ displayName, email, password })
			);
			dispatch(onLogin({ user: { displayName: data.name, uid: data.uid } }));
			toast.success("Cuenta creada con éxito", {
				theme: "dark",
			});
		} catch (error) {
			dispatch(onLogout({ errorMessage: errMsgCreateUser }));
			setTimeout(() => {
				dispatch(clearErrorMessage());
			}, 10);
		}
	};

	const checkAuthToken = async () => {
		const token = localStorage.getItem("token");
		if (!token)
			return dispatch(onLogout({ errorMessage: errMsgExpiredSession }));

		try {
			console.log(user.email);
			const { data } = await authApi.get("auth/renew");
			localStorage.setItem("token", data.token);
			localStorage.setItem("token", data.token);
			localStorage.setItem("token-init-date", new Date().getTime().toString());
			data.email = localStorage.getItem("user-email");
			data.photoUrl = localStorage.getItem("user-photo-url");
			dispatch(
				onLogin({
					user: {
						displayName: data.name,
						uid: data.uid,
						email: data.email,
						photoUrl: data.photoUrl,
					},
				})
			);
		} catch (error) {
			localStorage.clear();
			dispatch(onLogout({ errorMessage: errMsgExpiredSession }));
		}
	};

	const startLogout = async () => {
		localStorage.clear();
		dispatch(onCheckingCredentials());
		await delay(500);
		dispatch(onLogout({ errorMessage: "" }));
	};

	return {
		status,
		user,
		errorMessage,

		//Metodos
		startLogin,
		startRegister,
		checkAuthToken,
		startLogout,
	};
};
