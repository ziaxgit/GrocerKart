import React from "react";
import { View, Text } from "react-native";
import coldItemsData from "../data/coldItems.json";
import ColdItemCard from "./ColdItemCard";

const ColdItemsComponent: React.FC = () => {
  return (
    <View className="mx-2">
      <Text className="font-bold mx-2 mt-1  text-base">COLD ITEMS</Text>
      {coldItemsData.map((item: string, index: number) => (
        <ColdItemCard key={index} itemName={item} />
      ))}
    </View>
  );
};

export default ColdItemsComponent;
