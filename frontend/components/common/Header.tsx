import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AnimatePresence, MotiView } from "moti";
import {
  Box,
  Button,
  Center,
  ChevronLeftIcon,
  FormControl,
  HStack,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  SearchIcon,
  Spacer,
  Text,
  VStack,
} from "native-base";
import React, { ReactNode, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { RootStackParams } from "../../screens/Pages";
import { AnimatedBox } from "./Animated";
import WhiteInput from "./WhiteInput";

interface PropTypes {
  title: string;
  children: ReactNode;
  searchBar?: boolean;
  container?: boolean;
  onSearch?: (value: string) => void;
}

const Header = (props: PropTypes) => {
  const {
    title,
    children,
    searchBar = false,
    container = true,
    onSearch,
  } = props;

  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handleOpenSearchbar = () => {
    setIsSearchbarOpen(!isSearchbarOpen);
  };

  const handleSearch = () => {
    onSearch && onSearch(searchQuery);
  };

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
              {searchBar && (
                <Center>
                  <Pressable pl={5} py={4} onPress={handleOpenSearchbar}>
                    <SearchIcon color="white" size="5" />
                  </Pressable>
                </Center>
              )}
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
                  <WhiteInput
                    onChange={(e) => setSearchQuery(e.nativeEvent.text)}
                    InputRightElement={
                      <Button
                        rounded={"none"}
                        h={"100%"}
                        colorScheme={"amber"}
                        onPress={handleSearch}
                      >
                        Buscar
                      </Button>
                    }
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
        <ScrollView height={"100%"} showsVerticalScrollIndicator={false}>
          {container ? (
            <Box w={"90%"} mx={"auto"} mt={10} mb={20} background="white">
              {children}
            </Box>
          ) : (
            <Box mt={10} mb={20} background={"white"}>
              {children}
            </Box>
          )}
        </ScrollView>
      </AnimatedBox>
    </KeyboardAvoidingView>
  );
};

export default Header;
