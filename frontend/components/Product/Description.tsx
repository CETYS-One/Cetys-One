import { Text, Flex, VStack, Box } from "native-base";
import { SharedElement } from "react-navigation-shared-element";

const Description = () => {
  return (
    <VStack space={4} width={"100%"}>
      <Box>
        <Text fontSize={"25px"} fontWeight={"bold"}>
          FAMOUS STAR
        </Text>
        <Text fontSize={"30px"} color={"amber.400"}>
          $200
        </Text>
      </Box>
      <Text fontSize={"17px"}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
        asperiores, commodi vel voluptatum praesentium dignissimos.
      </Text>
    </VStack>
  );
};

export default Description;
