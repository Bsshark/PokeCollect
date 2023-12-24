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
		uid: "",
		email: "",
		displayName: "",
		photoUrl: "",
		errorMessage: null,
	},
	reducers: {
		checkingCredentials: (state) => {
			state.status = checkingStatus;
		},
		login: (state: AuthState, { payload }: PayloadAction<AuthState>) => {
			state.status = authenticatedStatus;
			state.uid = payload.uid;
			state.email = payload.email;
			state.displayName = payload.displayName;
			state.photoUrl = payload.photoUrl;
			state.errorMessage = null;
		},
		logout: (state: AuthState, action: PayloadAction<AuthErrorMessage>) => {
			state.status = notAuthenticatedStatus;
			state.uid = null;
			state.email = null;
			state.displayName = null;
			state.photoUrl = null;
			state.errorMessage = action?.payload.errorMessage;
		},
		clearErrorMessage: (state) => {
			state.errorMessage = null;
		},
	},
});
export const { checkingCredentials, login, logout, clearErrorMessage } = authSlice.actions;
