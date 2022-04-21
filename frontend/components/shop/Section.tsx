import {
  Text,
  Box,
  Image,
  Flex,
  HStack,
  VStack,
  ScrollView,
  Button,
} from "native-base";
import Product from "./Product";

const Section = () => {
  return (
    <Box>
      <VStack>
        <Box pl={"10px"}>
          <Text fontSize={"20px"} fontWeight={"bold"}>
            BURRITOS
          </Text>
        </Box>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack
            flexDirection={"row"}
            overflow={"hidden"}
            mt={"10px"}
            space={"3"}
            paddingBottom={"10px"}
            paddingLeft={"8px"}
          >
            <Product />
          </HStack>
        </ScrollView>
      </VStack>
    </Box>
  );
};
export default Section;
