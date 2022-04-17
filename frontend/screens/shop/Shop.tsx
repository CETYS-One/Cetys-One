import { Box, HStack, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import MainSection from "../../components/shop/MainSection";
const Shop = () => {
  return (
    <SafeAreaView>
      <Header title={"Tienda"} searchBar>
        <MainSection />
      </Header>
    </SafeAreaView>
  );
};

export default Shop;
