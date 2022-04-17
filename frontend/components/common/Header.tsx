import {
  Box,
  Button,
  Center,
  ChevronLeftIcon,
  FormControl,
  HStack,
  IconButton,
  Input,
  KeyboardAvoidingView,
  PresenceTransition,
  ScrollView,
  SearchIcon,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { ReactNode, useState } from "react";
import { RootStackParams } from "../../screens/Pages";
import { color } from "react-native-reanimated";

interface PropTypes {
  title: string;
  children: ReactNode;
  searchBar?: boolean;
  onSearchbarPressed?: () => void;
}
const Header = (props: PropTypes) => {
  const { title, children, searchBar = false, onSearchbarPressed } = props;

  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);

  // Workarourd
  const [renderPlaceholderList, setRenderPlaceholderList] = useState(false);

  const handleSearch = () => {
    setIsSearchbarOpen(false);
    setIsSearchbarOpen(!isSearchbarOpen);
  };

  const handleOpenSearchbar = () => {
    // setRenderPlaceholderList(true);
    setIsSearchbarOpen(!isSearchbarOpen);
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
    >
      <Box height="18%" background={"amber.500"}>
        <VStack w={"90%"} margin={"auto"}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color="white" size={5} />
          </TouchableOpacity>
          {/* <HStack mt={2}> */}
          <HStack mt={2}>
            <Text fontWeight={"700"} fontSize={"30px"} color="white">
              {title}
            </Text>
            <Spacer />
            <Center>
              {searchBar && (
                <SearchIcon
                  color="white"
                  size="5"
                  onPress={handleOpenSearchbar}
                />
              )}
            </Center>
          </HStack>
          <PresenceTransition
            visible={isSearchbarOpen}
            initial={{ translateX: -400 }}
            animate={{
              translateX: 0,
              transition: {
                type: "spring",
                velocity: 10,
              },
            }}
          >
            <FormControl w="100%" mt={2}>
              <Input
                variant={"outline"}
                borderColor={"white"}
                _light={{
                  placeholderTextColor: "white",
                  _focus: {
                    borderColor: "white",
                  },
                }}
                placeholder={"Busca aqui"}
                style={{ color: "white" }}
              />
            </FormControl>
          </PresenceTransition>
        </VStack>
      </Box>
      {searchBar ? (
        <PresenceTransition
          style={{ height: "85%" }}
          visible={isSearchbarOpen}
          initial={{ translateY: 0 }}
          animate={{ translateY: 30 }}
        >
          <Box
            background={"white"}
            borderTopRadius={20}
            mt={-4}
            height={"100%"}
          >
            <ScrollView height={"100%"}>
              <Box w={"90%"} mx={"auto"} mt={10} background="white">
                <>{children}</>
              </Box>
            </ScrollView>
          </Box>
        </PresenceTransition>
      ) : (
        <Box background={"white"} borderTopRadius={20} mt={-4} height="85%">
          <ScrollView height={"100%"}>
            <Box w={"90%"} mx={"auto"} mt={10} background="white">
              <>{children}</>
            </Box>
          </ScrollView>
        </Box>
      )}
    </KeyboardAvoidingView>
  );
};

export default Header;
