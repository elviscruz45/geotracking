import * as Yup from "yup";

export function initialValues() {
  return {
    Position: "Derecho",
  };
}

export function validationSchema() {
  return Yup.object({
    Zone: Yup.string().required("Selecciona una Faja"),
    Number1: Yup.string().required("Selecciona una Numero"),
    Number2: Yup.string().required("Selecciona una Numero"),
  });
}
