import * as Yup from "yup";
export function initialValues() {
  return {
    GuardiaDia: "",
    GuardiaNoche: "",
    GuardiaTotal: "",
    MesPlanificado: "",
    MesAvanzado: "",
    MesPendiente: "",
    TotalPlanificado: "",
    TotalAvanzado: "",
    TotalPendiente: "",
  };
}

export function validationSchema() {
  return Yup.object({
    // NombreServicio: Yup.string().required("Campo obligatorio"),
    // NumeroAIT: Yup.string().required("Campo obligatorio"),
    // AreaServicio: Yup.string().required("Campo obligatorio"),
    // TipoServicio: Yup.string().required("Campo obligatorio"),
    // ResponsableEmpresaUsuario: Yup.string().required("Campo obligatorio"),
    // ResponsableEmpresaContratista: Yup.string().required("Campo obligatorio"),
    // FechaFin: Yup.date().required("Campo obligatorio"),
    // NumeroCotizacion: Yup.string().required("Campo obligatorio"),
    // Moneda: Yup.string().required("Campo obligatorio"),
    // Monto: Yup.string().required("Campo obligatorio"),
    // HorasHombre: Yup.string().required("Campo obligatorio"),
  });
}