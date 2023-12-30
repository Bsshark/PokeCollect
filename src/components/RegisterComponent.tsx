import { Formik, Field, Form, ErrorMessage, FormikValues } from "formik";

import { useAuthStore } from "../hooks/useAuthStore";
import { Link } from "react-router-dom";
import { registerValidationSchema } from "../helpers";
import Swal from "sweetalert2";
import { WelcomePageProps } from "../interfaces/componentsInterfaces";

export const RegisterComponent = (props: WelcomePageProps) => {
	const { startRegister } = useAuthStore();

	const handleRegister = async (values: FormikValues) => {
		const { displayName, email, password, passwordConfirm } = values;

		if (password !== passwordConfirm) {
			Swal.fire(
				"Error en el registro",
				"Las contraseñas no coinciden",
				"error"
			);
			return;
		}

		startRegister({ displayName: displayName, email, password });
	};

	return (
		<>
			<p className="h3 pt-2 mb-4 p-2">Registro</p>
			<Formik
				initialValues={{
					displayName: "",
					email: "",
					password: "",
					passwordConfirm: "",
				}}
				validationSchema={registerValidationSchema}
				onSubmit={handleRegister}
			>
				<Form>
					<div className="form-floating mb-3">
						<Field
							type="text"
							id="displayName"
							name="displayName"
							className="form-control"
						/>
						<label htmlFor="displayName" className="form-label">
							Nombre de usuario:
						</label>
						<ErrorMessage
							name="displayName"
							component="div"
							className="text-danger"
						/>
					</div>

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

					<div className="form-floating mb-3">
						<Field
							type="password"
							id="passwordConfirm"
							name="passwordConfirm"
							className="form-control"
						/>
						<label htmlFor="passwordConfirm" className="form-label">
							Repita contraseña:
						</label>
						<ErrorMessage
							name="passwordConfirm"
							component="div"
							className="text-danger"
						/>
					</div>

					<div>
						<button type="submit" className="btn btn-primary">
							Crear cuenta
						</button>
					</div>
					<span>
						¿Ya tienes una cuenta?{" "}
						<Link to="/auth/login" onClick={props.onClick}>
							Logéate
						</Link>
					</span>
				</Form>
			</Formik>
		</>
	);
};
