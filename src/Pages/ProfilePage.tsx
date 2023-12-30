import { useAppSelector } from "../hooks";
import { AuthUser } from "../interfaces";
import { authSlice } from "../store/auth/authSlice";

export const ProfilePage = () => {
	const { user } = useAppSelector((state) => state.auth);
  const {displayName, email}: AuthUser = user;
  //console.log(user);

	return <>
    <div>{displayName}</div>
    <div>{email}</div>
  </>;
};
