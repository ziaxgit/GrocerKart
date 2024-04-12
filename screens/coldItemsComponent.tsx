import React from "react";
import { View, Text, TextInput } from "react-native";
import coldItemsData from "../data/coldItems.json";

const ColdItemsComponent: React.FC = () => {
  return (
    <View>
      <Text className="font-semibold mb-1">COLD ITEMS</Text>
      {coldItemsData.map((item: string, index: number) => (
        <View className="flex-row m-1">
          <TextInput
            className="bg-slate-200 w-5 text-center"
            inputMode="numeric"
            placeholder="0"
          />
          <Text key={index}>- {item}</Text>
        </View>
      ))}
    </View>
  );
};

export default ColdItemsComponent;
