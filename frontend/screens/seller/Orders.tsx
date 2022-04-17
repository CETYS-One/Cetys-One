import { Box, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import MainSection from "../../components/Orders/MainSection";

const Orders = () => {
  return (
    <SafeAreaView>
      <Header title={"Ordenes"}>
        <MainSection />
      </Header>
    </SafeAreaView>
  );
};

export default Orders;
