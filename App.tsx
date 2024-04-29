import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ItemsToOrderProvider } from "./components/ItemsToOrderContext"; // Import the context provider
import HomeScreen from "./screens/HomeScreen";
import HomeNavigation from "./navigation/HomeTabNavigation";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import OrderDetails from "./components/OrderDetails";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  return (
    <ItemsToOrderProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeNavigation}
          />
          <Stack.Screen
            options={{ title: "Order Details" }}
            name="OrderDetails"
            component={OrderDetails}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ItemsToOrderProvider>
  );
}
