import { Feather } from "@expo/vector-icons";
import { endOfDay } from "date-fns";
import { useState } from "react";
import {Flex, VStack, HStack, Text, Image, Button, ChevronDownIcon, ChevronUpIcon } from "native-base"
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { blue100 } from "react-native-paper/lib/typescript/styles/colors";
import Expand from "./Expand";

const Order=()=>{

    const [isExpanded, setIsExpanded] = React.useState(false);

    function setExpanded() {
        setIsExpanded(!isExpanded);
    }
return(
        <TouchableOpacity style={{borderWidth: 1, borderRadius:15}} onPress={setExpanded} activeOpacity={1}>
            <HStack alignItems={"center"} justifyContent={"space-between"}  paddingLeft={"20px"} paddingRight={"10px"}>
                <VStack justifyContent={"space-between"} py={"10px"}>
                    <Text fontSize={"20px"}>Daniel</Text>
                    <Text fontSize={"15px"} color={"gray.600"}>3 Producto(s)</Text>
                    <Text fontSize={"15px"} marginTop={3}>$105</Text>
                </VStack>
                <VStack justifyContent={"space-between"} borderWidth={0} h={100}>
                    <Text fontSize={"15px"}>13 de septiembre</Text>
                    <HStack justifyContent={"space-between"} alignItems={"center"} >
                        <Text color={"amber.400"} fontWeight={"bold"} fontSize={"20px"}>deVolada</Text>
                        {isExpanded?<ChevronUpIcon size={"20px"}  />:<ChevronDownIcon size={"20px"}  onPress={setExpanded}/>}
                    </HStack>
                </VStack>
            </HStack>
            {isExpanded? <Expand/>:null}
        </TouchableOpacity>
    );
}

export default Order;