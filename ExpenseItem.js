import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ExpenseItem({ expense }) {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{expense.description}</Text>
      <Text style={styles.text}>${expense.amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
  },
});