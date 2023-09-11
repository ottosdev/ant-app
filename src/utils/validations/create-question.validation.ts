import * as Yup from "yup";

export const ValidationQuestionSchama = Yup.object().shape({
  title: Yup.string().required("Por favor, insira o titulooo"),
  content: Yup.string().required("Por favor, insira a descrição"),
});
