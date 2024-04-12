import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import ColdItemsComponent from "./screens/coldItemsComponent";

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text className="text-center text-lg font-semibold ">
          GROCERY ORDER
        </Text>
        <StatusBar style="auto" />
        <ColdItemsComponent />
      </ScrollView>
    </SafeAreaView>
  );
}
