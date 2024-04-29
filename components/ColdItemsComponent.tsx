import React from "react";
import { View, Text } from "react-native";
import coldItemsData from "../data/coldItems.json";
import ColdItemCard from "./ColdItemCard";

const ColdItemsComponent: React.FC = () => {
  return (
    <View className="mx-2">
      <Text className="mx-2 font-bold m-2">COLD ITEMS</Text>
      {coldItemsData.map((item: string, index: number) => (
        <ColdItemCard key={index} itemName={item} />
      ))}
    </View>
  );
};

export default ColdItemsComponent;
