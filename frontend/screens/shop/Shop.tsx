import { Box, Text } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/shop/Header";
const Shop = () => {
  return (
    <SafeAreaView>
      <Box>
        <Header/>
      </Box>
    </SafeAreaView>
  );
};

export default Shop;
