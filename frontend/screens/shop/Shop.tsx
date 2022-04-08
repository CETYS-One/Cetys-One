import { Box, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/shop/Header";
import MainSection from "../../components/shop/MainSection";
const Shop = () => {
  return (
    <SafeAreaView>
      <Box>
        <Header/>
        <MainSection/>
      </Box>
    </SafeAreaView>
  );
};

export default Shop;
