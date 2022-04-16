import {Text, Flex, VStack} from 'native-base';

const Description = () => {
  return(
    <VStack space={3}  px={"27px"}  width={"100%"}>
      <Text fontSize={"30px"} fontWeight={"bold"}>FAMOUS STAR</Text>
      <Text fontSize={"16px"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate asperiores, commodi vel voluptatum praesentium dignissimos.</Text>
    </VStack>
  );
}

export default Description;