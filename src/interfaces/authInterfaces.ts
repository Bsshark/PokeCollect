export interface AuthState {
	status?: string;
	user: AuthUser;
	errorMessage?: string | null;
}

export interface AuthUser {
	uid: string | null;
	email?: string | null;
	displayName?: string | null;
	photoUrl?: string | null;
}

export interface AuthErrorMessage {
	errorMessage: string;
}

export interface LoginUser {
	email: string;
	password: string;
}

export interface RegisterUser {
	displayName: string;
	email: string;
	password: string;
}

export interface AuthLoginResponse {
	name: string;
	ok: boolean;
	token: string;
	uid: string;
	photoUrl: string;
}

export interface AuthRegisterResponse {
	name: string;
	ok: boolean;
	token: string;
	uid: string;
}
