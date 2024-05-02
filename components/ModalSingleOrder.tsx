import { View, Text, Modal } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TouchableOpacity } from "react-native";

interface Props {
  orderDetails: string;
  modalVisible: boolean;
  filename: string;
  setModalVisible: (visible: boolean) => void;
}

const ModalSingleOrder = ({
  orderDetails,
  filename,
  setModalVisible,
  modalVisible,
}: Props) => {
  console.log(filename, "<<<< modal filename");
  console.log(orderDetails, "<<<< modal orderDetails");

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="bg-blue-400 shadow-md ">
        <Text className="m-2 py-3 text-center font-semibold text-lg">
          ORDER: {filename}
        </Text>
      </View>
      <ScrollView className="p-3 bg-gray-100 pb-3 ">
        <View className="bg-white rounded-xl p-2 shadow-sm">
          <Text className="">{orderDetails}</Text>
        </View>
        <View className="flex-row items-center justify-center mb-8">
          <TouchableOpacity className="rounded-full p-3 m-3 bg-red-500 mx-1 w-44">
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
