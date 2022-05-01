import { Feather } from "@expo/vector-icons";
import {Flex, VStack, HStack, Text, Image, Button} from "native-base"
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { blue100 } from "react-native-paper/lib/typescript/styles/colors";

const Order=()=>{
return(
        <Flex w={"100%"}>
            <HStack alignItems={"center"} justifyContent={"space-between"} borderWidth={1} py={"10px"} px={"20px"}>
                <Text>hola</Text>
                <TouchableOpacity style={{backgroundColor:"blue", padding:3,}}><Text>Ver detalles</Text></TouchableOpacity>
            </HStack>
        </Flex>
    );
}

export default Order;