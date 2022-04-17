import { Box, HStack, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/common/Header";
import MainSection from "../../components/shop/MainSection";
const Shop = () => {
  return (
    <SafeAreaView>
      <Box bgColor={"white"}>
        <Header title="Productos">
          <MainSection />
        </Header>
      </Box>
    </SafeAreaView>
  );
};

export default Shop;
