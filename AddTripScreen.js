import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { getData, storeData } from "../utils/storage";
import { v4 as uuidv4 } from "uuid";

export default function AddTripScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddTrip = async () => {
    if (!title || !destination || !startDate || !endDate) return;
    const trips = (await getData("trips")) || [];
    const newTrip = {
      id: uuidv4(),
      title,
      destination,
      startDate,
      endDate,
      itinerary: [],
      expenses: [],
      photos: [],
      notes: [],
    };
    await storeData("trips", [...trips, newTrip]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Trip Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Destination" value={destination} onChangeText={setDestination} style={styles.input} />
      <TextInput placeholder="Start Date" value={startDate} onChangeText={setStartDate} style={styles.input} />
      <TextInput placeholder="End Date" value={endDate} onChangeText={setEndDate} style={styles.input} />
      <Button title="Add Trip" onPress={handleAddTrip} />
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