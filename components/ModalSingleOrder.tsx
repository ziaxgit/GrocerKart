// ModalSingleOrder.js
import { View, Text, Modal } from "react-native";
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";

interface Props {
  order: any;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  onDelete: () => void;
}

const ModalSingleOrder = ({
  order,
  setModalVisible,
  modalVisible,
  onDelete,
}: Props) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="bg-blue-300 shadow-md ">
        <Text className="m-2 py-3 text-center font-semibold text-lg">
          ORDER: {order.filename}
        </Text>
      </View>
      <ScrollView className="p-3 bg-gray-100 pb-3 ">
        <View className="bg-white rounded-xl p-2 shadow-sm">
          <Text className="">{order.orderDetails}</Text>
        </View>
        <View className="flex-row items-center justify-center mb-8">
          <TouchableOpacity
            className="rounded-full p-3 m-3 bg-red-500 mx-1 w-44"
            onPress={onDelete}
          >
            <Text className="text-white font-bold text-center">
              DELETE ORDER
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-full p-3 m-2 bg-zinc-600 mx-1 w-44"
            onPress={() => setModalVisible(false)}
          >
            <Text className="text-white font-bold text-center">CLOSE</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalSingleOrder;
