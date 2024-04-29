import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import { useItemsToOrder } from "../components/ItemsToOrderContext"; // Import the useItemsToOrder hook
import ColdItemsComponent from "../components/ColdItemsComponent";
import DryItemsComponent from "../components/DryItemsComponent";
import OrderDetails from "../components/OrderDetails";

export default function HomeScreen({ navigation }) {
  const { resetOrderItems } = useItemsToOrder(); // Use the useItemsToOrder hook to access context values

  const handleResetClick = () => {
    resetOrderItems();
    alert("Order resetted");
  };

  return (
    <SafeAreaView className="bg-" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <ColdItemsComponent />
        <DryItemsComponent />
        <TouchableOpacity
          className="rounded-full p-3 mb-2 bg-blue-500 mx-2"
          onPress={() => navigation.navigate("OrderDetails")}
        >
          <Text className="text-white font-bold text-center">
            CONFIRM ORDER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleResetClick}
          className="rounded-full p-3 mb-2 bg-gray-600 mx-2"
        >
          <Text className="text-white font-bold text-center">RESET</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
