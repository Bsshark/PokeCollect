import { Action, Dispatch } from "redux";
import { onCheckingCredentials, onLogin, onLogout } from "./authSlice";
import {
	loginWithEmailPassword,
	registerUserWithEmailPassword,
	singInWithGoogle,
} from "../../firebase/providers";
import { useAppDispatch } from "../../hooks/dispatch";
import { RegisterUser } from "../../interfaces/authInterfaces";

export const checkingAuthentication = () => {
	return async (dispatch: Dispatch<any> = useAppDispatch()) => {
		dispatch(onCheckingCredentials());
	};
};

export const startGoogleSignIn = () => {
	return async (dispatch: Dispatch<any> = useAppDispatch()) => {
		dispatch(onCheckingCredentials());
		const result = await singInWithGoogle();

		if (!result.ok) return dispatch(onLogout(result.errorMessage));

		//dispatch(onLogin(result));
	};
};

export const startCreatingUserWithEmailPassword = ({
	email,
	password,
	displayName,
}: RegisterUser) => {
	return async (dispatch: Dispatch<any> = useAppDispatch()) => {
		dispatch(onCheckingCredentials());

		const result = await registerUserWithEmailPassword({
			email,
			password,
			displayName,
		});
		console.log("Result: " + result);

		if(!result?.ok && result?.errorMessage) return dispatch(onLogout({errorMessage: result.errorMessage}));
		
        dispatch(onLogin({user: {...result}} )); 
	};
};

export const startLoginWithEmailPassword = ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch(onCheckingCredentials());

		const { ok, uid, photoURL, displayName, errorMessage } =
			await loginWithEmailPassword({ email, password });

		if (!ok) return dispatch(onLogout({ errorMessage }));
		dispatch(onLogin({user:{ uid, photoUrl: photoURL, displayName}, errorMessage }));
	};
};
