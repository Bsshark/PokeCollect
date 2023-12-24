import { Formik, Field, Form, ErrorMessage, FormikValues } from "formik";
import { loginValidationSchema } from "../helpers/validationSchemas";
import { useAuthStore } from "../hooks/useAuthStore";

export const LoginComponent = () => {
	const { startLogin } = useAuthStore();

	const handleLogin = async (values: FormikValues) => {
		const { email, password } = values;
		startLogin({ email, password });
	};

	return (
		<div className="container-sm">
			<div className=" px-5">
				<p className="h3 mt-4 mb-4">Iniciar Sesión</p>
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
					</Form>
				</Formik>
			</div>
		</div>
	);
};
