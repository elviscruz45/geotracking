import React from "react";
import { View, ScrollView, StyleSheet, Text, Image } from "react-native";
import { DataTable } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export const AvanceTotal = (props) => {
  const { dataReport } = props;
  const navigation = useNavigation();
  const newTableData = [
    {
      name: "Planificado",
      metros: dataReport[0]?.TotalPlanificado,
      negrita: false,
    },
    { name: "Avanzado", metros: dataReport[0]?.TotalAvanzado, negrita: false },
    { name: "Pendiente", metros: dataReport[0]?.TotalPendiente, negrita: true },
  ];

  const goToInformation = (idServiciosAIT) => {
    navigation.navigate(screen.search.tab, {
      screen: screen.search.item,
      params: { Item: idServiciosAIT },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <DataTable>
        {/* Table header */}
        <DataTable.Header>
          <DataTable.Title style={styles.multiLineColumn}>
            Tipo de Avance
          </DataTable.Title>
          <DataTable.Title style={styles.shortColumn2}>Metros</DataTable.Title>
        </DataTable.Header>

        {/* Table data */}
        {newTableData.map((item, index) => (
          <DataTable.Row key={index}>
            <Text
              style={{
                flex: 2,
                alignSelf: "center",

                fontWeight: item.negrita ? "bold" : "normal",

                color: item.negrita ? "blue" : "black",
              }}
            >
              {item.name}
            </Text>

            <Text
              style={{
                flex: 1,
                alignSelf: "center",
                fontWeight: item.negrita ? "bold" : "normal",

                color: item.negrita ? "blue" : "black",
              }}
            >
              {item.metros}
            </Text>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  shortColumn1: {
    flex: 0.77, // Adjust the value as per your requirement for the width
    maxWidth: 200, // Adjust the maxWidth as per your requirement
  },
  shortColumn2: {
    flex: 1, // Adjust the value as per your requirement for the width
  },
  shortColumn3: {
    flex: 0.4, // Adjust the value as per your requirement for the width
  },
  multiLineColumn: {
    flex: 2,
  },
});
