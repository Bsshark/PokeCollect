import { useAppSelector } from "../hooks";
import { AuthUser } from "../interfaces";
import { authSlice } from "../store/auth/authSlice";

export const ProfilePage = () => {
	const { user } = useAppSelector((state) => state.auth);
	const { displayName, email, photoUrl }: AuthUser = user;
	//console.log(user);

	return (
		<>
			<div
				className="container justify-content-center border border-secondary mt-4 d-flex flex-column"
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
