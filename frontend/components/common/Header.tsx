import { Box, ChevronLeftIcon, ScrollView, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { ReactNode } from "react";
import { RootStackParams } from "../../screens/Pages";

interface PropTypes {
  title: string;
  children: ReactNode;
}
const Header = (props: PropTypes) => {
  const { title, children } = props;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <Box>
      <Box height="18%" background={"amber.500"}>
        <VStack w={"90%"} margin={"auto"}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color="white" size={5} />
          </TouchableOpacity>
          <Text fontWeight={"700"} fontSize={"30px"} color="white" mt={2}>
            {title}
          </Text>
        </VStack>
      </Box>
      <Box background={"white"} borderTopRadius={20} mt={-4} height="85%">
        <ScrollView height={"100%"}>
          <Box w={"90%"} mx={"auto"} mt={10}>
            {children}
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Header;
