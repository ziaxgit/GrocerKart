import React from "react";
import { View, Text } from "react-native";
import coldItemsData from "../data/coldItems.json";
import ColdItemCard from "./ColdItemCard";

const ColdItemsComponent: React.FC = () => {
  return (
    <View style={{ backgroundColor: "#FF6347", padding: 10 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>COLD ITEMS</Text>
      {coldItemsData.map((item: string, index: number) => (
        <ColdItemCard key={index} itemName={item} />
      ))}
    </View>
  );
};

export default ColdItemsComponent;
