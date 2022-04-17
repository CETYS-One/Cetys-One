import { Box, HStack, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import MainSection from "../../components/shop/MainSection";
const Shop = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "#f59e0b" }}>
      <Header title={"Tienda"} searchBar container={false}>
        <MainSection />
      </Header>
    </SafeAreaView>
  );
};

export default Shop;
