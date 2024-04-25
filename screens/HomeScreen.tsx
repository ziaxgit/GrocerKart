import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from "react-native";
import { ItemsToOrderProvider } from "../screens/ItemsToOrderContext";
import ColdItemsComponent from "../screens/ColdItemsComponent";
import DryItemsComponent from "../screens/DryItemsComponent";
import OrderDetails from "../screens/OrderDetails";

export default function HomeScreen() {
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const resetOrder = () => {
    const resetColdItems = coldItems.map((item) => ({
      ...item,
      quantity: "0",
    }));
    const resetDryItems = dryItems.map((item) => ({ ...item, quantity: "0" }));

    resetColdItems.forEach((item) => addColdItemToOrder(item));
    resetDryItems.forEach((item) => addDryItemToOrder(item));
  };

  return (
    <SafeAreaView className="bg-" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <ItemsToOrderProvider>
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
          <TouchableOpacity className="rounded-full p-3 mb-2 bg-gray-600 mx-2">
            <Text className="text-white font-bold text-center">RESET</Text>
          </TouchableOpacity>
          {showOrderDetails && <OrderDetails />}
        </ItemsToOrderProvider>
      </ScrollView>
    </SafeAreaView>
  );
}
