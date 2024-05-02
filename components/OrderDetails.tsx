import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useItemsToOrder } from "./ItemsToOrderContext";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateFilename } from "../utils/generateFilename";

const OrderDetails: React.FC = ({ navigation }: any) => {
  const { coldItems, dryItems, setOrdersList, ordersList, setResetItems } =
    useItemsToOrder();

  const generateItemsString = (items: any[]) => {
    return items
      .map((item: any) => `${item.quantity} x ${item.name}`)
      .join("\n");
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(
      "ORDER FOR " + renderTodaysDate + "\n" + combinedItemsString
    );
    Alert.alert("Order Copied!", "You can view it in Order History", [
      {
        text: "Ok",
        style: "cancel",
        onPress() {
          navigation.navigate("Home");
          setResetItems(true);
        },
      },
    ]);
    await saveOrderDetails(combinedItemsString);
  };

  // Function to save the order details as a text file
  const saveOrderDetails = async (orderDetails: string) => {
    try {
      const filename = generateFilename();
      const order = { id: Date.now(), filename, orderDetails };
      const updateOrders = [...ordersList, order];
      setOrdersList(updateOrders);
      await AsyncStorage.setItem("orders", JSON.stringify(updateOrders));
      // console.log("Order details saved as:", order);
    } catch (error) {
      console.error("Error saving order details:", error);
    }
  };

  const coldItemsString = generateItemsString(coldItems);
  const dryItemsString = generateItemsString(dryItems);

  const renderTodaysDate = generateFilename().slice(0, 10);
  const combinedItemsString = coldItemsString + "\n\n" + dryItemsString;
  return (
    <ScrollView className="bg-gray-100 p-3">
      <View className="mb-1 ml-1 bg-white p-2 rounded-xl shadow-sm">
        <Text>ORDER FOR {renderTodaysDate + "\n"}</Text>
        <Text>{combinedItemsString}</Text>
      </View>
      <View className="flex-row justify-around mb-10">
        <TouchableOpacity
          className="rounded-full p-3 m-2 bg-blue-600 mx-1 w-44"
          onPress={copyToClipboard}
        >
          <Text className="text-white font-bold text-center">COPY ORDER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-full p-3 m-2 bg-zinc-600 mx-1 w-44"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white font-bold text-center">EDIT ORDER</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OrderDetails;
