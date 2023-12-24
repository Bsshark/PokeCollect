import { useAppDispatch, useAppSelector } from "./dispatch";
import { AuthLoginResponse, LoginUser } from "../interfaces/authInterfaces";
import { checkingCredentials, clearErrorMessage, login, logout } from "../store/auth/authSlice";
import authApi from "../api/authApi";
import { useDispatch } from "react-redux";

export const useAuthStore = () => {

    const dispatch = useDispatch();

	const { status, email, displayName, photoUrl, errorMessage } = useAppSelector(
		(state) => state.auth
	);

	const startLogin = async ({ email, password }: LoginUser) => {
		dispatch(checkingCredentials());

		try {
			const { data } = await authApi.post<AuthLoginResponse>("/auth", { email, password });
			localStorage.setItem("token", data.token);
            localStorage.setItem("token-init-date", new Date().getTime().toString());
            dispatch(login({displayName: data.name, uid: data.uid}));
		} catch (error) {
            dispatch(logout({errorMessage: "Credenciales incorrectas"}));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
	};

	return {
		status,
		email,
		displayName,
		photoUrl,
		errorMessage,

        //Metodos
        startLogin,
	};
};
