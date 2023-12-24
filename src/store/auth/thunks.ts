import { Action, Dispatch } from "redux"
import { checkingCredentials, login, logout } from "./authSlice";
import { loginWithEmailPassword } from "../../firebase/providers";

export const startLoginWithEmailPassword = ({email, password}: {email: string, password: string}) => {
    return async(dispatch: Dispatch<Action>) => {
        dispatch(checkingCredentials());


        const result = await loginWithEmailPassword({email, password});

        if(!result.ok) return dispatch(logout(result.errorMessage));

        console.log(result);

    }
}