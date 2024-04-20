import React from "react";
import { View, Text } from "react-native";
import { useItemsToOrder } from "./ItemsToOrderContext";

const OrderDetails: React.FC = () => {
  const { coldItems, dryItems } = useItemsToOrder();

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 10,
          marginHorizontal: 2,
        }}
      >
        Current Order:
      </Text>
      <View>
        <Text style={{ fontWeight: "bold" }}>Cold Items:</Text>
        {coldItems.map((item, index) => (
          <Text key={index} className="mx-2">
            {item.quantity} x {item.name}
          </Text>
        ))}
      </View>
      <View>
        <Text style={{ fontWeight: "bold" }}>Dry Items:</Text>
        {dryItems.map((item, index) => (
          <Text key={index} className="mx-2">
            {item.quantity} x {item.name}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default OrderDetails;
