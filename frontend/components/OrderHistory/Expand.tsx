import { Text, VStack, HStack, Flex, Box } from "native-base";
import { IShoppingProduct } from "../../context/ShopProvider";
import { AnimatedBox } from "../common/Animated";

interface PropTypes {
  items: IShoppingProduct[];
}
const Expand = ({ items }: PropTypes) => {
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
        {items.map((item) => (
          <HStack alignItems={"center"} space={"30px"} key={item.id}>
            <Text w={"80%"}>
              {item.quantity}x {item.product.name}
            </Text>
            <Text position={"absolute"} right={0}>
              ${item.quantity * item.product.price}
            </Text>
          </HStack>
        ))}
      </VStack>
    </AnimatedBox>
  );
};

export default Expand;
