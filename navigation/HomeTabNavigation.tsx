import React from "react";
import HomeScreen from "../screens/HomeScreen";
import PastOrdersScreen from "../screens/PastOrdersScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HomeNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: "Create Order",
          headerTitle: "Grocery Order",
          tabBarShowLabel: true,

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Order History"
        component={PastOrdersScreen}
        options={{
          tabBarLabel: "Order History",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
