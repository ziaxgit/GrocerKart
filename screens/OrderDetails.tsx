// OrderDetails.tsx
import React from "react";
import { View, Text } from "react-native";
import { useItemsToOrder } from "./ItemsToOrderContext";

const OrderDetails: React.FC = () => {
  const { itemsToOrder } = useItemsToOrder();

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Current Order:
      </Text>
      {itemsToOrder.map((item, index) => (
        <Text key={index}>
          {item.quantity} x {item.name}
        </Text>
      ))}
    </View>
  );
};

export default OrderDetails;
