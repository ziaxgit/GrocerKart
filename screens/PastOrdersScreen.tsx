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
import ModalSingleOrder from "../components/ModalSingleOrder";

export default function PastOrdersScreen() {
  const { setOrdersList, ordersList } = useItemsToOrder();
  const [modalVisible, setModalVisible] = useState(false);
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     try {
  //       const orders = await AsyncStorage.getItem("orders");
  //       // if (orders) {
  //       //   setOrdersList(JSON.parse(orders));
  //       // }
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //     }
  //   };
  //   // AsyncStorage.clear();
  //   fetchOrders();
  //   console.log(ordersList, "<<ASYNC ORDER LIST");
  // }, []);
  // console.log(ordersList, "<<ASYNC ORDER LIST");

  const [orderToDisplay, setOrderToDisplay] = useState({
    filename: "",
    orderDetails: "",
  });

  console.log(orderToDisplay, "<<<< ORDER TO DISPLAY");

  return (
    <ScrollView className="p-2 bg-blue-100 h-full">
      <Text className="text-center m-2">Click to view order details</Text>
      {ordersList.map((order: any) => (
        <View
          key={order.id}
          className=" bg-white h-14 p-2 rounded-xl justify-center shadow-sm m-2"
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              setOrderToDisplay(order);
              console.log(order, "<<<< ACTUAL ORDER");

              // console.log(order.filename, "<<<< ORDER");
            }}
          >
            <Text className="text-base font-semibold text-center">
              {order.filename}
            </Text>
          </TouchableOpacity>
          {/* <Text>{order.orderDetails}</Text> */}
          <ModalSingleOrder
            orderDetails={orderToDisplay.orderDetails}
            filename={orderToDisplay.filename}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </View>
      ))}
    </ScrollView>
  );
}
