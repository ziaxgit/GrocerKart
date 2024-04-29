import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import { useItemsToOrder } from "../screens/ItemsToOrderContext"; // Import the useItemsToOrder hook
import ColdItemsComponent from "../screens/ColdItemsComponent";
import DryItemsComponent from "../screens/DryItemsComponent";
import OrderDetails from "../screens/OrderDetails";

export default function HomeScreen() {
  const { resetOrderItems } = useItemsToOrder(); // Use the useItemsToOrder hook to access context values
  const [showOrderDetails, setShowOrderDetails] = useState(false);

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
          onPress={() => setShowOrderDetails(!showOrderDetails)}
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
        {showOrderDetails && <OrderDetails />}
      </ScrollView>
    </SafeAreaView>
  );
}
