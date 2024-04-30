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

const OrderDetails: React.FC = () => {
  const { coldItems, dryItems } = useItemsToOrder();

  // Function to generate a string of items separated by a line break
  const generateItemsString = (items: any[]) => {
    return items
      .map((item: any) => `${item.quantity} x ${item.name}`)
      .join("\n");
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(combinedItemsString);
    alert("Order copied to clipboard!");
    await saveOrderDetails("order_details.txt", combinedItemsString);
    alert("Order details saved as order_details.txt");
  };

  // Function to save the order details as a text file
  const saveOrderDetails = async (filename, content) => {
    try {
      await AsyncStorage.setItem(filename, content);
      console.log("Order details saved as:", filename);
    } catch (error) {
      console.error("Error saving order details:", error);
    }
  };

  // Generate strings for cold and dry items
  const coldItemsString = generateItemsString(coldItems);
  const dryItemsString = generateItemsString(dryItems);

  // Add an extra line break between cold and dry items
  const combinedItemsString = coldItemsString + "\n\n" + dryItemsString;
  return (
    // <Modal
    //   visible={isModalVisible}
    //   animationType="slide"
    //   presentationStyle="fullScreen"
    // >
    //   <SafeAreaProvider>
    <ScrollView>
      <View>
        <Text>ORDER DETAILS</Text>
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
        <TouchableOpacity
          className="rounded-full"
          onPress={() => setIsModalVisible(false)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    // </SafeAreaProvider>
    // </Modal>
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
