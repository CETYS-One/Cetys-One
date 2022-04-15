import {Text,Box, Image, Flex, HStack, VStack, ScrollView} from 'native-base';
import Product from './Product';
const Section = () => {
  return(
      <Box>
        <VStack >
          <Box pl={"7px"}>
            <Text fontSize={"20px"} fontWeight={"bold" }>BURRITOS</Text>
          </Box>
          <ScrollView horizontal={true}>
            <HStack flexDirection={"row"} overflow={"hidden"} mt={"10px"} space={"3"}  paddingBottom={"10px"}>
              <Product/>
              <Product/>
              <Product/>
              <Product/>
            </HStack>
          </ScrollView>
        </VStack>
      </Box>
);
}
export default Section;