import * as Yup from "yup";
export function initialValues() {
  return {
    NombreServicio: "",
    FechaInicio: null,
    FechaFin: null,
    Estado: "",
    ProgEjecutado: "",
    ProgProgramado: "",
    Cobertura: "",
    LogueadoPor: "",
    MetrosLogueo: "",
    Sector: "",
    Coord1: "",
    Coord2: "",
    Azimut: "",
    Dip: "",
    Cota: "",
    Maquina: "",
    Responsable: "",
    Taladro: "",
  };
}

export function validationSchema() {
  return Yup.object({
    // EmpresaMinera: Yup.string().required("Campo obligatorio"),
    // NombreServicio: Yup.string().required("Campo obligatorio"),
    // NumeroAIT: Yup.string().required("Campo obligatorio"),
    // AreaServicio: Yup.string().required("Campo obligatorio"),
    // TipoServicio: Yup.string().required("Campo obligatorio"),
    // ResponsableEmpresaUsuario: Yup.string().required("Campo obligatorio"),
    // ResponsableEmpresaContratista: Yup.string().required("Campo obligatorio"),
    // FechaInicio: Yup.date().required("Campo obligatorio"),
    // FechaFin: Yup.date().required("Campo obligatorio"),
    // NumeroCotizacion: Yup.string().required("Campo obligatorio"),
    // Moneda: Yup.string().required("Campo obligatorio"),
    // Monto: Yup.string().required("Campo obligatorio"),
    // HorasHombre: Yup.string().required("Campo obligatorio"),
  });
}
