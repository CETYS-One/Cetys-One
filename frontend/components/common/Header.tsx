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
import { AnimatePresence, MotiText, MotiView } from "moti";
import { AnimatedBox } from "./Animated";

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
      <Box height={"18%"} background={"amber.500"}>
        <VStack w={"90%"} margin={"auto"}>
          <MotiView animate={{ translateY: isSearchbarOpen ? -15 : 0 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ChevronLeftIcon color="white" size={5} />
            </TouchableOpacity>
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
          </MotiView>
          <AnimatePresence>
            {isSearchbarOpen && (
              <MotiView
                from={{ translateX: -400 }}
                animate={{ translateX: 0 }}
                exit={{ translateX: -400 }}
                style={{ position: "absolute", bottom: -40, right: 0, left: 0 }}
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
              </MotiView>
            )}
          </AnimatePresence>
        </VStack>
      </Box>

      <AnimatedBox
        background={"white"}
        borderTopRadius={20}
        mt={-4}
        height="85%"
        animate={{ translateY: isSearchbarOpen ? 40 : 0 }}
      >
        <ScrollView height={"100%"}>
          <Box w={"90%"} mx={"auto"} mt={10} mb={20} background="white">
            {children}
          </Box>
        </ScrollView>
      </AnimatedBox>
      {/* )} */}
    </KeyboardAvoidingView>
  );
};

export default Header;
