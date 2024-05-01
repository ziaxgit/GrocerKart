import { View, Text, Modal } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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
  console.log(filename, "modal filename");
  console.log(orderDetails, "modal orderDetails");

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="px-2 bg-red-300 shadow-md ">
        <Text className="m-2 text-center font-semibold text-lg">
          ORDER FOR {filename}
        </Text>
      </View>
      <View className="p-4 bg-blue-100 rounded-xl">
        <Text className="">{orderDetails}</Text>
      </View>
    </Modal>
  );
};

export default ModalSingleOrder;
