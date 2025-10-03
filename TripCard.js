import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TripCard({ trip, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{trip.title}</Text>
      <Text>{trip.destination}</Text>
      <Text>{trip.startDate} - {trip.endDate}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});