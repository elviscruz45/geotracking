import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import * as Sharing from "expo-sharing";

export const getExcelReportData = async (datas = []) => {
  console.log("datas", datas);

  const post_array = [];

  datas.forEach((data) => {
    const table = {
      //Datos principales del servicio
      FechaInicio: data.FechaInicio, //ok
      Fecha_Creacion: data.createdAt?.toDate().getTime(), //ok
      MetrosLogueoInicio: data.MetrosLogueoInicio, //ok
      MetrosLogueoFinal: data.MetrosLogueoFinal, //ok
      previa: data.previa, //ok
    };
    post_array.push(table);
  });

  const worksheet = XLSX.utils.json_to_sheet(post_array);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelFileBuffer = XLSX.write(workbook, {
    type: "array",
    bookType: "xlsx",
  });

  const base64String = Buffer.from(excelFileBuffer).toString("base64");
  const fileUri = `${FileSystem.cacheDirectory}dataset.xlsx`;

  try {
    await FileSystem.writeAsStringAsync(fileUri, base64String, {
      encoding: FileSystem.EncodingType.Base64,
    });

    Sharing.shareAsync(fileUri);
  } catch (error) {
    console.log("Error creating Excel file:", error);
  }
};
