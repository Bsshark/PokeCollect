import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
	authenticatedStatus,
	checkingStatus,
	notAuthenticatedStatus,
} from "../../helpers";
import { AuthErrorMessage, AuthState } from "../../interfaces/authInterfaces";
export const authSlice = createSlice({
	name: "auth",
	initialState: {
		status: checkingStatus,
		user: {},
		errorMessage: null,
	},
	reducers: {
		onCheckingCredentials: (state: AuthState) => {
			state.status = checkingStatus;
		},
		onLogin: (state: AuthState, { payload }: PayloadAction<AuthState>) => {
			state.status = authenticatedStatus;
			state.user.uid = payload.user.uid;
			state.user.email = payload.user.email;
			state.user.displayName = payload.user.displayName;
			state.user.photoUrl = payload.user.photoUrl;
			state.errorMessage = null;
		}/* ,
		onLoginChecked: (
			state: AuthState,
			{ payload }: PayloadAction<AuthState>
		) => {
			state.status = authenticatedStatus;
			state.user.displayName = payload.user.displayName;
			state.user.uid = payload.user.uid;
			state.errorMessage = null;
		} */,
		onLogout: (state: AuthState, action: PayloadAction<AuthErrorMessage>) => {
			state.status = notAuthenticatedStatus;
			state.user.uid = null;
			state.user.email = null;
			state.user.displayName = null;
			state.user.photoUrl = null;
			state.errorMessage = action?.payload.errorMessage;
		},
		clearErrorMessage: (state) => {
			state.errorMessage = null;
		},
	},
});
export const {
	onCheckingCredentials,
	onLogin,
	onLogout,
	clearErrorMessage,
	
} = authSlice.actions;
