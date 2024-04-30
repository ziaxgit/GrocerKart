import {
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useItemsToOrder } from "../components/ItemsToOrderContext";

export default function PastOrdersScreen() {
  const { setOrdersList, ordersList } = useItemsToOrder();
  console.log("====================================");
  console.log(ordersList);
  console.log("====================================");
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await AsyncStorage.getItem("orders");
        if (orders) {
          setOrdersList(JSON.parse(orders));
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <View>
      <Text>Past Orders Screen</Text>
    </View>
  );
}
