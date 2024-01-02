import { NavProfileIconProps } from "../interfaces/componentsInterfaces";

export const NavProfileIcon = (props: NavProfileIconProps): JSX.Element => {
	const { user, isMobile } = props;
	return (
		<i>
			<img
				src={user.photoUrl ? user.photoUrl : ""}
				alt={`${user.displayName}`}
				style={{
					height: "3em",
					width: "3em",
					objectFit: "cover",
					boxShadow: "0px 0px 10px black"
				}}
				className="rounded-circle"
			/>
			<span style={{ paddingLeft: "0.3em" }}>{isMobile ? "" : "Perfil"}</span>
		</i>
	);
};
