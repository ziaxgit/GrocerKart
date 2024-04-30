import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useItemsToOrder } from "./ItemsToOrderContext";
import * as Clipboard from "expo-clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { generateFilename } from "../utils/generateFilename";

const OrderDetails: React.FC = () => {
  const { coldItems, dryItems, setOrdersList, ordersList } = useItemsToOrder();

  const generateItemsString = (items: any[]) => {
    return items
      .map((item: any) => `${item.quantity} x ${item.name}`)
      .join("\n");
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(combinedItemsString);
    alert("Order copied to clipboard!");
    await saveOrderDetails(combinedItemsString);
    // alert("Order details saved as order_details.txt");
  };

  // Function to save the order details as a text file
  const saveOrderDetails = async (orderDetails: string) => {
    try {
      const filename = generateFilename();
      const order = { id: Date.now(), filename, orderDetails };
      const updateOrders = [...ordersList, order];
      setOrdersList(updateOrders);
      await AsyncStorage.setItem("orders", JSON.stringify(updateOrders));
      console.log("Order details saved as:", order);
    } catch (error) {
      console.error("Error saving order details:", error);
    }
  };

  const coldItemsString = generateItemsString(coldItems);
  const dryItemsString = generateItemsString(dryItems);

  const renderTodaysDate = generateFilename().slice(0, 10);
  const combinedItemsString = coldItemsString + "\n\n" + dryItemsString;
  return (
    <ScrollView>
      <View>
        <Text>ORDER FOR {renderTodaysDate + "\n"}</Text>
        <Text>{combinedItemsString}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          className="rounded-full"
          onPress={copyToClipboard}
          style={styles.button}
        >
          <Text style={styles.buttonText}>COPY ORDER</Text>
        </TouchableOpacity>
        <TouchableOpacity className="rounded-full" style={styles.button}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "gray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#008000",
    padding: 10,
    borderRadius: 5,
    width: "48%", // Adjust button width as needed
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default OrderDetails;
