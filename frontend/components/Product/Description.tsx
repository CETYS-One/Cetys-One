import { Text, Flex, VStack, Box, HStack, Badge, Spacer } from "native-base";
import { useContext } from "react";
import { SharedElement } from "react-navigation-shared-element";
import { ShopContext } from "../../context/ShopProvider";

interface PropTypes {
  name: string;
  price: number;
  description: string;
  category: string;
  from: "DVolada" | "Cafeteria" | "Honey";
}
const Description = ({
  name,
  price,
  description,
  category,
  from,
}: PropTypes) => {
  const { storeData } = useContext(ShopContext);
  return (
    <VStack space={4} width={"100%"}>
      <Box>
        <Text fontSize={"25px"} fontWeight={"bold"}>
          {name}
        </Text>
        <HStack mt={2}>
          <Text fontSize={"30px"} color={storeData?.color}>
            ${price}
          </Text>
          <Spacer />
          <Badge colorScheme={from === "DVolada" ? "success" : "warning"}>
            {category}
          </Badge>
        </HStack>
      </Box>
      <Text fontSize={"17px"}>{description}</Text>
    </VStack>
  );
};

export default Description;
