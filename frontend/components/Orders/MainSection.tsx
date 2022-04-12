import {Text, Flex, Box, View, HStack, VStack, Image, ScrollView, Center} from "native-base";
import Order from "./Order";
const MainSection = () => {
  return(
    <Flex w={"100%"}>
      
      <ScrollView w={"100%"}>
        <Center>
          <VStack space={"10px"} py={"10px"} w={"80%"} flex={3}>
            <Order/>
            <Order/>
            <Order/>  
            <Order/>
            <Order/>
            <Order/>
            <Order/>
            <Order/>
            <Order/>
            <Order/>
            <Order/>
            <Order/>
          </VStack>
        </Center>
      </ScrollView>
    </Flex>
);
}

export default MainSection;