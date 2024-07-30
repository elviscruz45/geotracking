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
      ID: data.AITNombreSondaje,
      FECHA_DE_PERFORACION: formatDate(data.createdAt?.toDate().getTime()), //ok
      DE: data.MetrosLogueoInicio, //ok
      A: data.MetrosLogueoFinal, //ok
      DESCRIPCION_LITOLOGICA: data.previa, //ok
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

function formatDate(timestamp) {
  // Create a new Date object using the timestamp
  const date = new Date(timestamp);

  // Get the day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();

  // Format the date as dd/mm/yyyy
  return `${day}/${month}/${year}`;
}
