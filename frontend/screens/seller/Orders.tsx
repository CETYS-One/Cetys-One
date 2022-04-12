import { Box, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Orders/Header";
import MainSection from "../../components/Orders/MainSection";

const Orders = () => {
  return (
    <SafeAreaView>
      <Header/>
      <MainSection/>
    </SafeAreaView>
  );
};

export default Orders;
