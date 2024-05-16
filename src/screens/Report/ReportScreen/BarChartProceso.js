import React from "react";

import { View, StyleSheet, Text, Dimensions } from "react-native";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryTooltip,
  VictoryContainer,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import { tipoServicioList } from "../../../utils/tipoServicioList";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
export const BarChartProceso = (props) => {
  //pie configuration
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const { data } = props;
  let datas;
  let sumByEtapa;
  if (data) {
    sumByEtapa = {
      NoCompl: 0,
      EDPNoPagados: 0,
      Compl: 0,
      EDPPagados: 0,
    };

    const totalEntries = data?.length;
    for (let i = 0; i < totalEntries; i++) {
      if (
        data[i].AvanceAdministrativoTexto === "Contratista-Registro de Pago"
      ) {
        if (data[i].Moneda === "Dolares") {
          sumByEtapa["EDPPagados"] += parseInt(data[i].Monto) * 3.5;
        }
        if (data[i].Moneda === "Euros") {
          sumByEtapa["EDPPagados"] += parseInt(data[i].Monto) * 4;
        }
        if (data[i].Moneda === "Soles") {
          sumByEtapa["EDPPagados"] += parseInt(data[i].Monto);
        }
      } else if (
        data[i]["AvanceAdministrativoTexto"] === "Contratista-Envio EDP"
      ) {
        if (data[i]["Moneda"] === "Dolares") {
          sumByEtapa["EDPNoPagados"] += parseInt(data[i].Monto) * 3.5;
        }
        if (data[i]["Moneda"] === "Euros") {
          sumByEtapa["EDPNoPagados"] += parseInt(data[i].Monto) * 4;
        }
        if (data[i]["Moneda"] === "Soles") {
          sumByEtapa["EDPNoPagados"] += parseInt(data[i].Monto);
        }
      } else if (
        data[i]["AvanceAdministrativoTexto"] ===
          "Contratista-Avance Ejecucion" &&
        data[i]["AvanceEjecucion"] === "100"
      ) {
        if (data[i]["Moneda"] === "Dolares") {
          sumByEtapa["Compl"] += parseInt(data[i].Monto) * 3.5;
        }
        if (data[i]["Moneda"] === "Euros") {
          sumByEtapa["Compl"] += parseInt(data[i].Monto) * 4;
        }
        if (data[i]["Moneda"] === "Soles") {
          sumByEtapa["Compl"] += parseInt(data[i].Monto);
        }
      } else if (
        data[i]["AvanceAdministrativoTexto"] !== "Stand by" &&
        data[i]["AvanceAdministrativoTexto"] !== "Cancelacion"
      ) {
        if (data[i]["Moneda"] === "Dolares") {
          sumByEtapa["NoCompl"] += parseInt(data[i].Monto) * 3.5;
        }
        if (data[i]["Moneda"] === "Euros") {
          sumByEtapa["NoCompl"] += parseInt(data[i].Monto) * 4;
        }
        if (data[i]["Moneda"] === "Soles") {
          sumByEtapa["NoCompl"] += parseInt(data[i].Monto);
        }
      }
    }

    datas = [
      {
        label: "Pagado",
        value: sumByEtapa["EDPPagados"],
        unidad: "Soles",
      },
      {
        label: "No Pagado",
        value: sumByEtapa["EDPNoPagados"],
        unidad: "Soles",
      },
      {
        label: "Completado",
        value: sumByEtapa["Compl"],
        unidad: "Soles",
      },
      {
        label: "Ejecucion",
        value: sumByEtapa["NoCompl"],
        unidad: "Soles",
      },
    ];
  }

  let datainaObject = {
    Pagado: 0,
    "No Pagado": 0,
    Completado: 0,
    Ejecucion: 0,
  };
  datas.forEach((element) => {
    datainaObject[element.label] = element.value;
  });
  if (data?.length === 0) {
    return (
      <>
        <Text></Text>
        <Text style={{ alignSelf: "center" }}>
          No hay datos para mostrar grafica
        </Text>
      </>
    );
  }

  const datass = {
    labels: ["Pagado", "No Pagado", "Completado", "Ejecucion"],
    datasets: [
      {
        // data: [20, 45, 28, 80, 99, 430],
        data: [
          datainaObject["Pagado"],
          datainaObject["No Pagado"],
          datainaObject["Completado"],
          datainaObject["Ejecucion"],
        ],
      },
    ],
  };
  return (
    <BarChart
      style={graphStyle}
      data={datass}
      width={screenWidth}
      height={320}
      yAxisLabel="S/."
      chartConfig={chartConfig}
      verticalLabelRotation={30}
    />
  );
};
const graphStyle = {
  marginVertical: 8,
  paddingRight: 100,
  borderRadius: 16,
  backgroundColor: "black",
};

const styles = StyleSheet.create({
  container: {
    margin: 20, // padding: 30,
    // marginRight: 80,
    // margin: 10,
    // paddingHorizontal: 40,
    // alignSelf: "flex-start",
    // margin: 10,
    // flex: 1,
    // justifyContent: "right",
    // alignItems: "center",
    // backgroundColor: "white",
  },
});
