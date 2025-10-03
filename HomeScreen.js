import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { getData, storeData } from "../utils/storage";
import TripCard from "../components/TripCard";

export default function HomeScreen({ navigation }) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const stored = await getData("trips");
      setTrips(stored || []);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button title="Add Trip" onPress={() => navigation.navigate("AddTrip")} />
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripCard
            trip={item}
            onPress={() => navigation.navigate("TripDetails", { tripId: item.id })}
          />
        )}
        ListEmptyComponent={<Text>No trips yet. Add a trip!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f2f2" },
});