// PastOrdersScreen.js
import { Alert, View, ScrollView, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useItemsToOrder } from "../components/ItemsToOrderContext";
import ModalSingleOrder from "../components/ModalSingleOrder";

export default function PastOrdersScreen() {
  const { ordersList, setOrdersList } = useItemsToOrder();
  const [modalVisible, setModalVisible] = useState(false);
  const [orderToDisplay, setOrderToDisplay] = useState({
    id: 0,
    filename: "",
    orderDetails: "",
  });

  const handleDeleteOrder = (orderId: number) => {
    // Filter out the order with the specified orderId
    Alert.alert("Alert", "Delete this order from history?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress() {
          const updatedOrders = ordersList.filter(
            (order) => order.id !== orderId
          );
          setOrdersList(updatedOrders);
          // Update AsyncStorage
          AsyncStorage.setItem("orders", JSON.stringify(updatedOrders));
          // Close the modal after deleting
          setModalVisible(false);
        },
      },
    ]);
  };

  useEffect(() => {
    // Get the orders from AsyncStorage
    AsyncStorage.getItem("orders").then((orders) => {
      if (orders) {
        setOrdersList(JSON.parse(orders));
      }
    });
  }, []);

  return (
    <ScrollView className="p-2 bg-gray-100 h-full">
      <Text className="text-center m-1">Click to view order details</Text>
      {ordersList.map((order) => (
        <View
          key={order.id}
          className=" bg-blue-300 h-14 p-2 rounded-xl justify-center shadow-sm m-2"
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setOrderToDisplay({ ...order });
            }}
          >
            <Text className="text-base font-semibold text-center">
              {order.filename}
            </Text>
          </TouchableOpacity>
          <ModalSingleOrder
            order={orderToDisplay}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            onDelete={() => handleDeleteOrder(orderToDisplay.id)}
          />
        </View>
      ))}
    </ScrollView>
  );
}
