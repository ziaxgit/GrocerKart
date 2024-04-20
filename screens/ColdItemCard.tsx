// ColdItemCard.tsx
import React from "react";
import { View, Text, TextInput } from "react-native";
import { useItemsToOrder } from "./ItemsToOrderContext";

interface Props {
  itemName: string;
  itemQuantity: string;
}

const ColdItemCard: React.FC<Props> = ({ itemName, itemQuantity }) => {
  const { addColdItemToOrder } = useItemsToOrder();

  const handleQuantityChange = (value: string) => {
    const item = { name: itemName, quantity: value };
    addColdItemToOrder(item);
  };

  return (
    <View style={{ flexDirection: "row", marginVertical: 5 }}>
      <TextInput
        style={{ backgroundColor: "#708090", width: 30, textAlign: "center" }}
        value={itemQuantity}
        onChangeText={handleQuantityChange}
        keyboardType="numeric"
        placeholder="0"
        returnKeyType="done"
      />
      <Text> - {itemName}</Text>
    </View>
  );
};

export default ColdItemCard;
