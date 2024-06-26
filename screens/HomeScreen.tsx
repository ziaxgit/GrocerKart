import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useItemsToOrder } from "../components/ItemsToOrderContext"; // Import the useItemsToOrder hook
import ColdItemsComponent from "../components/ColdItemsComponent";
import DryItemsComponent from "../components/DryItemsComponent";

export default function HomeScreen({ navigation }: any) {
  const { resetOrderItems, coldItems, dryItems } = useItemsToOrder(); // Use the useItemsToOrder hook to access context values

  const handleResetClick = () => {
    Alert.alert("Alert", "This will reset your current list", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Reset",
        style: "destructive",
        onPress() {
          resetOrderItems();
        },
      },
    ]);
  };

  const handleConfirmClick = () => {
    if (coldItems.length === 0 && dryItems.length === 0) {
      alert("You have not added any items");
    } else {
      navigation.navigate("OrderDetails");
    }
  };
  return (
    <SafeAreaView className="bg-gray-100" style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <ColdItemsComponent />
        <DryItemsComponent />
        <TouchableOpacity
          className="rounded-full p-3 mb-2 bg-blue-600 mx-3"
          onPress={handleConfirmClick}
        >
          <Text className="text-white font-bold text-center">
            CONFIRM ORDER
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-full p-3 mb-2 bg-zinc-600 mx-3"
          onPress={handleResetClick}
        >
          <Text className="text-white font-bold text-center">RESET</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
