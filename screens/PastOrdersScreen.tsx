import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

const RenderData = (content) => {
  return (
    <View>
      <Text>{content}</Text>
    </View>
  );
};

export default function PastOrdersScreen() {
  // Function to read the saved text file
  const [data, setData] = useState("");
  const [showData, setShowData] = useState(false);
  const readOrderDetails = async (filename) => {
    try {
      const content = await AsyncStorage.getItem(filename);
      if (content !== null) {
        console.log("Order details retrieved:", content);
        // Handle how you want to display or use the order details
        setData(content);
        setShowData(true);
      } else {
        console.error("File not found:", filename);
      }
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        className="rounded-full"
        onPress={() => readOrderDetails("order_details.txt")}
      >
        <Text>View file</Text>
      </TouchableOpacity>
      {showData && <RenderData content={data} />}
    </View>
  );
}
