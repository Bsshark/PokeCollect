import { useEffect, useState } from "react";
import { LoginComponent, RegisterComponent } from "../components";
import { useSpring, animated } from "@react-spring/web";

export const WelcomeScreen = () => {
	const [showLogin, setShowLogin] = useState(true);
	const [springs, api] = useSpring(() => ({
		from: { opacity: 0 },
		to: { opacity: 1 },
	}));

	const toggleShown = () => {
		showLogin ? setShowLogin(false) : setShowLogin(true);
	};

	useEffect(() => {
		api.start({
			from: { opacity: 0 },
			to: { opacity: 1 },
		});
	}, [showLogin]);

	return (
		<div className="container d-flex align-items-center justify-content-center" style={{minHeight: '100dvh'}}>
			<animated.div
				className={`row justify-content-center w-50 form-container rounded`}
				style={{ ...springs }}
			>
				<div className="col md-6 rounded p-4">
					{showLogin ? (
						<LoginComponent onClick={() => toggleShown()}></LoginComponent>
					) : (
						/* bottomMessage={
						<p>
							¿No tienes una cuenta? <Link to="/auth/register">Regístrate</Link>
						</p>
					} */
						<RegisterComponent
							onClick={() => toggleShown()}
							/* bottomMessage={
						<p>
							¿No tienes una cuenta? <Link to="/auth/login">Regístrate</Link>
						</p>
					} */
						/>
					)}
				</div>
			</animated.div>
		</div>
	);
};
