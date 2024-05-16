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
import { pad } from "lodash";
export const BarChartMontoServicios = (props) => {
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

  //data for the bar chart
  const { data } = props;

  let datas;

  let sumByTipoServicio;
  if (data) {
    sumByTipoServicio = {
      "Parada de Planta": 0,
      Reparacion: 0,
      Fabricacion: 0,
      Ingenieria: 0,
      Instalacion: 0,
      IngenieriayFabricacion: 0,
      Otro: 0,
    };

    const totalEntries = data?.length;
    for (let i = 0; i < totalEntries; i++) {
      const tipoServicio = data[i].TipoServicio;

      if (data[i]["Moneda"] === "Dolares") {
        sumByTipoServicio[tipoServicio] += parseInt(data[i].Monto) * 3.5;
      }
      if (data[i]["Moneda"] === "Euros") {
        sumByTipoServicio[tipoServicio] += parseInt(data[i].Monto) * 4;
      }

      if (data[i]["Moneda"] === "Soles") {
        sumByTipoServicio[tipoServicio] += parseInt(data[i].Monto);
      }
    }
    //"Parada de Planta"
    datas = [
      {
        label: "Parada de Planta",
        value: sumByTipoServicio["Parada de Planta"] ?? 0,
        unidad: "Soles",
      },
      {
        label: "Reparacion",
        value: sumByTipoServicio["Reparacion"] ?? 0,
        unidad: "Soles",
      },
      {
        label: "Fabricacion",
        value: sumByTipoServicio["Fabricacion"] ?? 0,
        unidad: "Soles",
      },
      {
        label: "Ingenieria",
        value: sumByTipoServicio["Ingenieria"] ?? 0,
        unidad: "Soles",
      },
      {
        label: "InInstalacionst",
        value: sumByTipoServicio["Instalacion"] ?? 0,
        unidad: "Soles",
      },
      {
        label: "IngenieriayFabricacion",
        value: sumByTipoServicio["IngenieriayFabricacion"] ?? 0,
        unidad: "Soles",
      },
      {
        label: "Otro",
        value: sumByTipoServicio["Otro"] ?? 0,
        unidad: "Soles",
      },
    ];
  }

  let datainaObject = {
    "Parada de Planta": 0,
    Reparacion: 0,
    Fabricacion: 0,
    Ingenieria: 0,
    Instalacion: 0,
    IngenieriayFabricacion: 0,
    Otro: 0,
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
    labels: ["PPlanta", "Rep", "Fab", "Ing", "Inst", "IngFab", "Otro"],
    datasets: [
      {
        // data: [20, 45, 28, 80, 99, 430],
        data: [
          datainaObject["Parada de Planta"],
          datainaObject["Reparacion"],
          datainaObject["Fabricacion"],
          datainaObject["Ingenieria"],
          datainaObject["Instalacion"],
          datainaObject["IngenieriayFabricacion"],
          datainaObject["Otro"],
        ],
      },
    ],
  };
  return (
    // <Text>hola</Text>
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
    flex: 1,
    marginLeft: -50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
