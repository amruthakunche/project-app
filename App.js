import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import TripDetailScreen from "./src/screens/TripDetailScreen";
import AddTripScreen from "./src/screens/AddTripScreen";
import AddExpenseScreen from "./src/screens/AddExpenseScreen";
import AddItineraryScreen from "./src/screens/AddItineraryScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TripDetails" component={TripDetailScreen} />
        <Stack.Screen name="AddTrip" component={AddTripScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="AddItinerary" component={AddItineraryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}