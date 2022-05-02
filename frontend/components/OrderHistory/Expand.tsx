import {Text, VStack, HStack, Flex, Box,} from "native-base";

const Expand = () => {
    return(
        <Flex borderBottomRadius={"10px"} borderTopWidth={".3"}>
            <VStack w={"80%"} py={"10px"} m={"auto"} justifyContent={"space-between"} space={"1"} >
                <HStack alignItems={"center"} space={"30px"}>
                    <Text>Hamburguesa</Text>
                    <Text position={"absolute"} right={0}>$20</Text>
                </HStack>
                <HStack alignItems={"center"} space={"30px"}>
                    <Text>Hamburguesa</Text>
                    <Text  position={"absolute"} right={0}>$20</Text>
                </HStack>
                <HStack alignItems={"center"} space={"30px"}>
                    <Text>Spaguetti</Text>
                    <Text  position={"absolute"} right={0}>$20</Text>
                </HStack>
                <HStack borderTopWidth={.3} mt={2}>
                    <Text>Total</Text>
                    <Text  position={"absolute"} right={0} fontWeight={"bold"}>$105</Text>
                </HStack>
            </VStack>
        </Flex>
    );
}

export default Expand;