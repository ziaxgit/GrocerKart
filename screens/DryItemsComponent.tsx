import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import dryItemsData from "../data/dryItems.json";
import DryItemCard from "./DryItemCard";

const DryItemsComponent: React.FC = () => {
  return (
    <View style={{ backgroundColor: "#FF6347", padding: 10 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>DRY ITEMS</Text>
      {dryItemsData.map((item: string, index: number) => (
        <DryItemCard key={index} itemName={item} />
      ))}
    </View>
  );
};

export default DryItemsComponent;
