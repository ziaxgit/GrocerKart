import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import coldItemsData from "../data/coldItems.json";
import ItemCard from "./ItemCard";

const ColdItemsComponent: React.FC = () => {
  const [itemsToOrder, setItemsToOrder] = useState<string[]>();

  return (
    <View style={{ backgroundColor: "#FF6347", padding: 10 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>COLD ITEMS</Text>
      {coldItemsData.map((item: string, index: number) => (
        <ItemCard key={index} itemName={item} />
      ))}
    </View>
  );
};

export default ColdItemsComponent;