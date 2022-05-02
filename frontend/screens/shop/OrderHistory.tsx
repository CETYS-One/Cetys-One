import { Box, Text, Flex, ChevronLeftIcon, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import Order from "../../components/OrderHistory/Order";

const OrderHistory = () => {
  return (
    <SafeAreaView>
      <Header title="Historial de Ordenes" >
        <Order/>
      </Header>
    </SafeAreaView>
  );
};

export default OrderHistory;
