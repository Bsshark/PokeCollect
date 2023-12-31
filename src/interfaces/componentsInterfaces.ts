import { AuthUser } from "."

export interface WelcomePageProps {
    onClick: () => void
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