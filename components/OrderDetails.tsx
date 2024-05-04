import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Share,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useItemsToOrder } from "./ItemsToOrderContext";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateFilename } from "../utils/generateFilename";
import { EvilIcons } from "@expo/vector-icons";

const OrderDetails: React.FC = ({ navigation }: any) => {
  const { coldItems, dryItems, setOrdersList, ordersList, setResetItems } =
    useItemsToOrder();

  const generateItemsString = (items: any[]) => {
    return items
      .map((item: any) => `${item.quantity} x ${item.name}`)
      .join("\n");
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(orderWithDate);
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
      const updateOrders = [...ordersList, order].sort((a, b) => b.id - a.id);

      setOrdersList(updateOrders);
      await AsyncStorage.setItem("orders", JSON.stringify(updateOrders));
      // console.log("Order details saved as:", order);
    } catch (error) {
      console.error("Error saving order details:", error);
    }
  };

  const handleOnShare = async () => {
    try {
      const result = await Share.share({
        message: orderWithDate,
      });
      if (result.action === Share.sharedAction) {
        if (result) {
          // shared with activity type of result.activityType
          Alert.alert(
            "Alert",
            "Do you want to save this order to Order History?",
            [
              {
                text: "No",
              },
              {
                text: "Yes",
                async onPress() {
                  try {
                    await saveOrderDetails(combinedItemsString);
                    setResetItems(true);
                    navigation.navigate("Home");
                    alert("Order saved to Order History!");
                  } catch (error) {
                    console.error("Error saving order details:", error);
                  }
                },
              },
            ]
          );
        }
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const coldItemsString = generateItemsString(coldItems);
  const dryItemsString = generateItemsString(dryItems);

  const renderTodaysDate = generateFilename().slice(0, 10);
  const combinedItemsString = coldItemsString + "\n\n" + dryItemsString;
  const orderWithDate =
    "ORDER FOR " + renderTodaysDate + "\n\n" + combinedItemsString;

  return (
    <ScrollView className="bg-gray-100 p-3">
      <View className="mb-1 ml-1 bg-white p-2 rounded-xl shadow-sm">
        <Text>ORDER FOR {renderTodaysDate + "\n"}</Text>
        <Text>{combinedItemsString}</Text>
      </View>
      <View className="flex-col justify-around mb-10">
        <View>
          <TouchableOpacity
            className="rounded-full p-3 m-2 bg-blue-600 mx-1"
            onPress={copyToClipboard}
          >
            <Text className="text-white font-bold text-center">COPY ORDER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-full p-3 m-2 bg-zinc-600 mx-1"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white font-bold text-center">EDIT ORDER</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="rounded-full p-3 m-2 bg-zinc-600 mx-1"
          onPress={handleOnShare}
        >
          <View className="flex-row items-center justify-center">
            <EvilIcons name="share-apple" size={24} color="white" />
            <Text className="text-white font-bold text-center">SHARE</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OrderDetails;
