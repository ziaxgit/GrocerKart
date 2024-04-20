import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ItemsToOrderProvider } from "./screens/ItemsToOrderContext";
import ColdItemsComponent from "./screens/coldItemsComponent";
import OrderDetails from "./screens/OrderDetails";

export default function App() {
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  return (
    <SafeAreaView style={{ backgroundColor: "#90EE90", flex: 1 }}>
      <ScrollView style={{ backgroundColor: "#87CEEB", flex: 1 }}>
        <ItemsToOrderProvider>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            GROCERY ORDER
          </Text>
          <StatusBar style="auto" />
          <ColdItemsComponent />
          <TouchableOpacity
            style={{
              backgroundColor: "#008000",
              marginTop: 20,
              marginHorizontal: 50,
              padding: 10,
            }}
            onPress={() => setShowOrderDetails(true)}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Confirm Order
            </Text>
          </TouchableOpacity>
          {showOrderDetails && <OrderDetails />}
        </ItemsToOrderProvider>
      </ScrollView>
    </SafeAreaView>
  );
}
