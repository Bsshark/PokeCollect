import * as Yup from "yup";
import { LoginUser, RegisterUser } from "../interfaces/authInterfaces";

const emailErrorMsg = "Ingrese un correo electrónico válido.";
//const nameErrorMsg = "Ingrese un nombre válido.";
const passwordErrorMsg = "Ingrese una clave válida.";
const passwordConfirmErrorMsg = "Las contraseñas no coinciden";

const nameMissingMsg = "Introduzca un nombre.";
const emailMissingMsg = "Introduzca un correo.";
const passwordMissingMsg = "Introduzca una contraseña.";
const passwordConfirmMissing = "Introduzca la contraseña de nuevo."

export const loginValidationSchema: Yup.Schema<LoginUser> = Yup.object().shape({
	email: Yup.string().email("Ingrese un correo electrónico válido.").required(emailMissingMsg),
	password: Yup.string().required("Campo obligatorio"),
});

export const registerValidationSchema: Yup.Schema<RegisterUser> =
	Yup.object().shape({
		displayName: Yup.string().required(nameMissingMsg),
		email: Yup.string().email(emailErrorMsg).required(emailMissingMsg),
		password: Yup.string()
			.required(passwordMissingMsg)
			.min(8, passwordErrorMsg),
		passwordConfirm: Yup.string().required(passwordConfirmMissing).oneOf(
			[Yup.ref("password")],
			passwordConfirmErrorMsg
		),
	});
