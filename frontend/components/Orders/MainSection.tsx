import {
  Text,
  Flex,
  Box,
  View,
  HStack,
  VStack,
  Image,
  ScrollView,
  Center,
} from "native-base";
import Order from "./Order";
const MainSection = () => {
  return (
    <Flex w={"100%"}>
      <VStack space={3}>
        <Order />
        <Order />
      </VStack>
    </Flex>
  );
};

export default MainSection;
