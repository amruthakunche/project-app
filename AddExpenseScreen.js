import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { getData, storeData } from "../utils/storage";

export default function AddExpenseScreen({ route, navigation }) {
  const { tripId } = route.params;
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = async () => {
    if (!description || !amount) return;
    const trips = (await getData("trips")) || [];
    const updatedTrips = trips.map((trip) => {
      if (trip.id === tripId) {
        return {
          ...trip,
          expenses: [
            ...(trip.expenses || []),
            { description, amount: parseFloat(amount) }
          ]
        };
      }
      return trip;
    });
    await storeData("trips", updatedTrips);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" style={styles.input} />
      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    backgroundColor: "#fff",
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});