export interface AuthState {
    status?: string;
    uid?: string | null;
    email?: string | null;
    displayName?: string | null;
    photoUrl?: string | null;
    errorMessage?: string | null;
}

export interface AuthErrorMessage {
    errorMessage: string;
}

export interface LoginUser {
    email: string;
    password: string;
}

export interface RegisterUser {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

export interface AuthLoginResponse {
    name: string;
    ok: boolean;
    token: string;
    uid: string;
}