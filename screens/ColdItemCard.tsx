// ColdItemCard.tsx
import React from "react";
import { View, Text, TextInput } from "react-native";
import { useItemsToOrder } from "./ItemsToOrderContext";
import { AntDesign } from "@expo/vector-icons";

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
    <View className="flex-row justify-between shadow-2xl bg-slate-50 my-1">
      <View className="justify-center">
        <Text>{itemName}</Text>
      </View>
      <View className="flex-row gap-1">
        <AntDesign name="pluscircleo" size={24} color="green" />
        <TextInput
          className="bg-white w-7 text-center"
          value={itemQuantity}
          onChangeText={handleQuantityChange}
          keyboardType="numeric"
          placeholder="0"
          returnKeyType="done"
        />
        <AntDesign name="minuscircleo" size={24} color="red" />
      </View>
    </View>
  );
};

export default ColdItemCard;
