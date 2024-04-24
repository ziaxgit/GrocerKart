import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import { useItemsToOrder } from "./ItemsToOrderContext";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const OrderDetails: React.FC = () => {
  const { coldItems, dryItems } = useItemsToOrder();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to generate a string of items separated by a line break
  const generateItemsString = (items) => {
    return items.map((item) => `${item.quantity} x ${item.name}`).join("\n");
  };

  // Generate strings for cold and dry items
  const coldItemsString = generateItemsString(coldItems);
  const dryItemsString = generateItemsString(dryItems);

  // Add an extra line break between cold and dry items
  const combinedItemsString = coldItemsString + "\n\n" + dryItemsString;

  return (
    <Modal>
      <SafeAreaProvider>
        <SafeAreaView>
          <View>
            <Text>ORDER DETAILS</Text>
            <Text>{combinedItemsString}</Text>
          </View>
          <TouchableOpacity>
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
