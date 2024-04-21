// ColdItemCard.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useItemsToOrder } from "./ItemsToOrderContext";
import { AntDesign } from "@expo/vector-icons";
import * as Haptic from "expo-haptics";

interface Props {
  itemName: string;
  itemQuantity: string;
}

const ColdItemCard: React.FC<Props> = ({ itemName }) => {
  const { addColdItemToOrder } = useItemsToOrder();
  const [quantity, setQuantity] = useState("0");

  const handleQuantityChange = (value: string) => {
    const item = { name: itemName, quantity: quantity };
    addColdItemToOrder(item);
  };

  const incrementQuantity = () => {
    Haptic.selectionAsync(); // Add haptic feedback

    const newQuantity = parseInt(quantity) + 1; // Increment quantity
    setQuantity(newQuantity.toString()); // Update state
    const item = { name: itemName, quantity: newQuantity.toString() }; // Use the updated quantity
    addColdItemToOrder(item);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = parseInt(prevQuantity) - 1;
      return newQuantity < 0 ? "0" : newQuantity.toString();
    });
  };

  return (
    <View className="flex-row justify-between shadow-2xl bg-slate-50 p-2 bg-green-100">
      <View className="justify-center">
        <Text>{itemName}</Text>
      </View>
      <View className="flex-row gap-1 mr-2">
        <TouchableOpacity onPress={decrementQuantity}>
          <AntDesign name="minuscircleo" size={20} color="red" />
        </TouchableOpacity>

        <TextInput
          className="bg-white w-7 text-center"
          // onChangeText={handleQuantityChange}
          keyboardType="numeric"
          placeholder="0"
          returnKeyType="done"
          value={quantity}
        />
        <TouchableOpacity onPress={incrementQuantity}>
          <AntDesign name="pluscircleo" size={20} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ColdItemCard;
