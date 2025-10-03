import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, Image, StyleSheet } from "react-native";
import { getData } from "../utils/storage";
import ExpenseItem from "../components/ExpenseItem";
import MapView, { Marker } from "react-native-maps";

export default function TripDetailScreen({ route, navigation }) {
  const { tripId } = route.params;
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      const trips = (await getData("trips")) || [];
      const t = trips.find((tr) => tr.id === tripId);
      setTrip(t);
    };
    const unsubscribe = navigation.addListener("focus", fetchTrip);
    return unsubscribe;
  }, [navigation]);

  if (!trip) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trip.title}</Text>
      <Text>{trip.destination}</Text>
      <Text>{trip.startDate} - {trip.endDate}</Text>

      <Button title="Add Itinerary" onPress={() => navigation.navigate("AddItinerary", { tripId })} />
      <FlatList
        data={trip.itinerary}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => <Text>- {item}</Text>}
        ListHeaderComponent={<Text style={styles.section}>Itinerary:</Text>}
      />

      <Button title="Add Expense" onPress={() => navigation.navigate("AddExpense", { tripId })} />
      <FlatList
        data={trip.expenses}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => <ExpenseItem expense={item} />}
        ListHeaderComponent={<Text style={styles.section}>Expenses:</Text>}
      />

      <Text style={styles.section}>Photos:</Text>
      <FlatList
        horizontal
        data={trip.photos}
        keyExtractor={(uri, idx) => uri + idx}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={{ width: 100, height: 100, margin: 4 }} />
        )}
        ListEmptyComponent={<Text>No photos yet.</Text>}
      />

      <Text style={styles.section}>Destination:</Text>
      <MapView
        style={{ width: "100%", height: 150 }}
        initialRegion={{
          latitude: 37.78825, // example, replace with real geocoded data
          longitude: -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title={trip.destination}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 6 },
  section: { fontSize: 18, marginTop: 14, fontWeight: "bold" },
});