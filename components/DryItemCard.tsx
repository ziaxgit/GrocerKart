// DryItemCard.tsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useItemsToOrder } from "./ItemsToOrderContext";
import { AntDesign } from "@expo/vector-icons";
import * as Haptic from "expo-haptics";

interface Props {
  itemName: string;
}

const DryItemCard: React.FC<Props> = ({ itemName }) => {
  const { addDryItemToOrder } = useItemsToOrder();
  const [quantity, setQuantity] = useState("0");
  const [isQuantityChanged, setIsQuantityChanged] = useState(false);

  const handleQuantityChange = (value: string) => {
    const item = { name: itemName, quantity: quantity };
    addDryItemToOrder(item);
  };

  const incrementQuantity = () => {
    setIsQuantityChanged(true);
    Haptic.selectionAsync(); // Add haptic feedback
    const newQuantity = parseInt(quantity) + 1; // Increment quantity
    setQuantity(newQuantity.toString()); // Update state
    const item = { name: itemName, quantity: newQuantity.toString() }; // Use the updated quantity
    addDryItemToOrder(item);
  };

  const decrementQuantity = () => {
    setIsQuantityChanged(true);
    Haptic.selectionAsync(); // Add haptic feedback
    const newQuantity = parseInt(quantity) - 1; // Decrement quantity
    const updatedQuantity = newQuantity < 0 ? 0 : newQuantity; // Ensure quantity doesn't go below 0
    setQuantity(updatedQuantity.toString()); // Update state
    const item = { name: itemName, quantity: updatedQuantity.toString() }; // Use the updated quantity
    addDryItemToOrder(item);
  };

  return (
    <View className="flex-row justify-between shadow-sm bg-white py-1 px-2 m-1 rounded-xl">
      <View className="justify-center">
        <Text>{itemName}</Text>
      </View>
      <View className="flex-row gap-1 ">
        <TouchableOpacity onPress={decrementQuantity}>
          <AntDesign name="minuscircleo" size={24} color="red" />
        </TouchableOpacity>

        <TextInput
          className="bg-white w-7 text-center font-semibold"
          // onChangeText={handleQuantityChange}
          readOnly={true}
          keyboardType="numeric"
          placeholder="0"
          returnKeyType="done"
          value={quantity}
        />
        <TouchableOpacity onPress={incrementQuantity}>
          <AntDesign name="pluscircleo" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DryItemCard;
