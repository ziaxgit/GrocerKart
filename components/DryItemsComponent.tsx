import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import dryItemsData from "../data/dryItems.json";
import DryItemCard from "./DryItemCard";

const DryItemsComponent: React.FC = () => {
  return (
    <View style={{ padding: 10 }}>
      <Text className="font-bold mx-2 -mt-1 text-base">DRY ITEMS</Text>
      {dryItemsData.map((item: string, index: number) => (
        <DryItemCard key={index} itemName={item} />
      ))}
    </View>
  );
};

export default DryItemsComponent;
