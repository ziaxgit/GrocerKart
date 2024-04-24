import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { useItemsToOrder } from "./ItemsToOrderContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";

const OrderDetails: React.FC = () => {
  const { coldItems, dryItems } = useItemsToOrder();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to generate a string of items separated by a line break
  const generateItemsString = (items) => {
    return items.map((item) => `${item.quantity} x ${item.name}`).join("\n");
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
    <Modal visible={isModalVisible}>
      <SafeAreaProvider>
        <SafeAreaView>
          <View>
            <Text>ORDER DETAILS</Text>
            <Text>{combinedItemsString}</Text>
          </View>
          <TouchableOpacity onPress={copyToClipboard}>
            <Text>COPY ORDER</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Text>CLOSE</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

export default OrderDetails;
