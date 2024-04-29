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
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";

const OrderDetails: React.FC = () => {
  const { coldItems, dryItems } = useItemsToOrder();
  const [isModalVisible, setIsModalVisible] = useState(true);

  // Function to generate a string of items separated by a line break
  const generateItemsString = (items: any[]) => {
    return items
      .map((item: any) => `${item.quantity} x ${item.name}`)
      .join("\n");
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(combinedItemsString);
    alert("Order copied to clipboard!");
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
