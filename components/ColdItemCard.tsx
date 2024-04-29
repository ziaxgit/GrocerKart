// ColdItemCard.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useItemsToOrder } from "./ItemsToOrderContext";
import { AntDesign } from "@expo/vector-icons";
import * as Haptic from "expo-haptics";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

interface Props {
  itemName: string;
}

const ColdItemCard: React.FC<Props> = ({ itemName }) => {
  const { addColdItemToOrder, resetItems, setResetItems } = useItemsToOrder();
  const [quantity, setQuantity] = useState("0");
  const [isQuantityChanged, setIsQuantityChanged] = useState(false);

  const handleQuantityChange = (value: string) => {
    const item = { name: itemName, quantity: quantity };
    addColdItemToOrder(item);
  };

  const incrementQuantity = () => {
    setIsQuantityChanged(true);
    Haptic.selectionAsync(); // Add haptic feedback
    const newQuantity = parseInt(quantity) + 1; // Increment quantity
    setQuantity(newQuantity.toString()); // Update state
    const item = { name: itemName, quantity: newQuantity.toString() }; // Use the updated quantity
    addColdItemToOrder(item);
  };

  const decrementQuantity = () => {
    setIsQuantityChanged(true);
    Haptic.selectionAsync(); // Add haptic feedback
    const newQuantity = parseInt(quantity) - 1; // Decrement quantity
    const updatedQuantity = newQuantity < 0 ? 0 : newQuantity; // Ensure quantity doesn't go below 0
    setQuantity(updatedQuantity.toString()); // Update state
    const item = { name: itemName, quantity: updatedQuantity.toString() }; // Use the updated quantity
    addColdItemToOrder(item);
  };

  useEffect(() => {
    if (resetItems) {
      setQuantity("0");
      setIsQuantityChanged(false);
      setResetItems(false);
    }
  }, [resetItems]);

  return (
    <View
      className={`shadow-sm flex-row justify-between ${
        isQuantityChanged && Number(quantity) > 0 ? "bg-green-200" : "bg-white"
      } py-1 px-2 m-1 rounded-xl`}
    >
      <View className="justify-center">
        <Text>{itemName}</Text>
      </View>
      <View className="flex-row gap-1 justify-center">
        <TouchableOpacity onPress={decrementQuantity}>
          <AntDesign name="minuscircleo" size={24} color="red" />
        </TouchableOpacity>

        <TextInput
          className="bg-white w-7 text-center font-semibold rounded-full"
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

export default ColdItemCard;
