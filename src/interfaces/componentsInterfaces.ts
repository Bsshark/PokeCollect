import { ChangeEvent } from "react";
import { AuthUser } from ".";

export interface WelcomePageProps {
	onClick: () => void;
}

export interface NavProfileIconProps {
	user: AuthUser;
	isMobile: boolean;
}
export interface NavPokemonItemProps {
	isMobile: boolean;
	to: string;
	alt: string;
	src: string;
}

export interface PokeFilterSearchProps {
	onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
	search: string;
}

export interface PokeFilterArrowPageProps {
    search: string;
    isLoading: boolean;
    arrowDirection: string;
    pagination: number;
	firstLoad: boolean;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	page: number;
}