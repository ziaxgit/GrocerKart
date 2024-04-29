import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ItemsToOrderProvider } from "./components/ItemsToOrderContext"; // Import the context provider
import HomeScreen from "./screens/HomeScreen";
import PastOrders from "./screens/PastOrdersScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeNavigation from "./navigation/HomeStackNavigation";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ItemsToOrderProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Homes"
            component={HomeNavigation}
            options={{
              tabBarLabel: "Create Order",
              headerTitle: "Grocery Order",
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
            component={PastOrders}
            options={{
              tabBarLabel: "Order History",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="history"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ItemsToOrderProvider>
  );
}
