import { useAppSelector } from "../hooks";
import { AuthUser } from "../interfaces";

export const ProfilePage = () => {
	const { user } = useAppSelector((state) => state.auth);
	const { displayName, email, photoUrl }: AuthUser = user;
	//console.log(user);

	return (
		<>
			<div
				className="container border border-secondary my-2 d-flex flex-column profileComponent"
				style={{ width: "70%"}}
			>
				<div className="p-2">{
          <img src={photoUrl?photoUrl:''} alt="Profile Photo" style={{width: '8em', height: '8em', objectFit: "cover"}}/>
        }</div>
				<div className="p-2">
					<span className="fw-bold">Nombre:</span> {displayName}
				</div>
				<div className="p-2">
					<span className="fw-bold">Correo:</span> {email}
				</div>
				{/* <div className="p-2">
					<span className="fw-bold">Medallero:</span> 
				</div> */}
			</div>
		</>
	);
};
