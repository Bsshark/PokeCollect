import { Formik, Field, Form, ErrorMessage, FormikValues } from "formik";

import { useAuthStore } from "../hooks/useAuthStore";
import { loginValidationSchema } from "../helpers/validationSchemas";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { errMsgCredentialsLogin } from "../helpers/errorMessages";
import { WelcomePageProps } from "../interfaces/componentsInterfaces";
import { Link } from "react-router-dom";

export const LoginComponent = (props: WelcomePageProps) => {
	const { startLogin, errorMessage } = useAuthStore();

	const handleLogin = async (values: FormikValues) => {
		const { email, password } = values;
		startLogin({ email, password });
	};

	useEffect(() => {
		if (errorMessage === errMsgCredentialsLogin) {
			Swal.fire({title: "Error en la autenticación", text: errMsgCredentialsLogin!, icon: "error", heightAuto: false} );
		}
	}, [errorMessage]);

	return (
		<>
			<p className="h3 pt-2 mb-4 p-2">Iniciar Sesión</p>
			<Formik
				initialValues={{ email: "", password: "" }}
				validationSchema={loginValidationSchema}
				onSubmit={handleLogin}
			>
				<Form>
					<div className="form-floating mb-3">
						<Field
							type="text"
							id="email"
							name="email"
							className="form-control"
						/>
						<label htmlFor="email" className="form-label">
							Correo electrónico:
						</label>
						<ErrorMessage
							name="email"
							component="div"
							className="text-danger"
						/>
					</div>

					<div className="form-floating mb-3">
						<Field
							type="password"
							id="password"
							name="password"
							className="form-control"
						/>
						<label htmlFor="password" className="form-label">
							Contraseña:
						</label>
						<ErrorMessage
							name="password"
							component="div"
							className="text-danger"
						/>
					</div>

					<div>
						<button type="submit" className="btn btn-primary">
							Iniciar sesión
						</button>
					</div>
					<span>
						¿No tienes una cuenta?{" "}
						<Link to="/auth/login" onClick={props.onClick}>
							Regístrate
						</Link>
					</span>
				</Form>
			</Formik>
		</>
	);
};
