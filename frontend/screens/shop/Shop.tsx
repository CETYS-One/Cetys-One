import { Box, HStack, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/shop/Header";
import MainSection from "../../components/shop/MainSection";
const Shop = () => {
  return (
    <SafeAreaView>
      <Box bgColor={"white"}>
        <Header/>
        <MainSection/>
      </Box>
    </SafeAreaView>
  );
};

export default Shop;
