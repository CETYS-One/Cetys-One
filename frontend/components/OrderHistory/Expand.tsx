import { Text, VStack, HStack, Flex, Box } from "native-base";
import { IShoppingProduct } from "../../context/ShopProvider";
import { AnimatedBox } from "../common/Animated";

interface PropTypes {
  item: IShoppingProduct[];
}
const Expand = ({ item }: PropTypes) => {
  return (
    <AnimatedBox
      borderBottomRadius={"10px"}
      borderTopWidth={".3"}
      borderColor={"gray.300"}
      from={{ opacity: 0, translateY: -10 }}
      animate={{ opacity: 1, translateY: 0 }}
    >
      <VStack
        w={"80%"}
        py={"10px"}
        m={"auto"}
        justifyContent={"space-between"}
        space={"1"}
      >
        <HStack alignItems={"center"} space={"30px"}>
          <Text>Hamburguesa</Text>
          <Text position={"absolute"} right={0}>
            $20
          </Text>
        </HStack>
        <HStack alignItems={"center"} space={"30px"}>
          <Text>Hamburguesa</Text>
          <Text position={"absolute"} right={0}>
            $20
          </Text>
        </HStack>
        <HStack alignItems={"center"} space={"30px"}>
          <Text>Spaguetti</Text>
          <Text position={"absolute"} right={0}>
            $20
          </Text>
        </HStack>
        <HStack borderTopWidth={0.3} mt={2}>
          <Text>Total</Text>
          <Text position={"absolute"} right={0} fontWeight={"bold"}>
            $105
          </Text>
        </HStack>
      </VStack>
    </AnimatedBox>
  );
};

export default Expand;
