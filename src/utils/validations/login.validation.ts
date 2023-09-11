import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email inválido!")
    .required("Por favor, insira seu e-mail!"),
  password: Yup.string()
    .required("Por favor, insira sua senha!")
    .min(5, "No minimo 6 caracteres"),
});
