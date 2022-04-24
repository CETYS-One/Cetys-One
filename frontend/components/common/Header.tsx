import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AnimatePresence, MotiView } from "moti";
import {
  Box,
  Button,
  Center,
  ChevronLeftIcon,
  ChevronRightIcon,
  FormControl,
  HamburgerIcon,
  HStack,
  KeyboardAvoidingView,
  Menu,
  Pressable,
  ScrollView,
  SearchIcon,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import React, { ReactNode, useContext, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserNav } from "../../screens/navigators/UserNavigator";
import { RootStackParams } from "../../screens/Pages";
import { AnimatedBox } from "./Animated";
import WhiteInput from "./WhiteInput";
import { shadeColor } from "../../util/shadeColor";
import { ShopContext } from "../../context/ShopProvider";

interface PropTypes {
  title: string;
  children: ReactNode;
  searchBar?: boolean;
  container?: boolean;
  isLoading?: boolean;
  bgColor?: string;
  onSearch?: (value: string) => void;
}

const Header = (props: PropTypes) => {
  const {
    title,
    children,
    searchBar = false,
    container = true,
    isLoading = false,
    onSearch,
    bgColor = "#f59e0b",
  } = props;

  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation<DrawerNavigationProp<UserNav>>();

  const handleOpenSearchbar = () => {
    setIsSearchbarOpen(!isSearchbarOpen);
  };

  const handleSearch = () => {
    onSearch && onSearch(searchQuery);
  };

  const { openDrawer, drawerRef } = useContext(ShopContext);

  return (
    <SafeAreaView style={{ backgroundColor: bgColor }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={false}
      >
        <Box height={"18%"} style={{ backgroundColor: bgColor }}>
          <VStack w={"90%"} margin={"auto"}>
            <MotiView animate={{ translateY: isSearchbarOpen ? -15 : 0 }}>
              <HStack>
                <TouchableOpacity onPress={() => drawerRef?.current?.open()}>
                  <HamburgerIcon color="white" size={5} />
                </TouchableOpacity>
              </HStack>
              <HStack mt={2}>
                <Text fontWeight={"700"} fontSize={"30px"} color="white">
                  {title}
                </Text>
                {isLoading && <Spinner color={"white"} ml={5} />}
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
                  style={{
                    position: "absolute",
                    bottom: -40,
                    right: 0,
                    left: 0,
                  }}
                >
                  <FormControl w="100%" mt={2} position={"relative"} zIndex={2}>
                    <WhiteInput
                      onChange={(e) => setSearchQuery(e.nativeEvent.text)}
                      InputRightElement={
                        <Button
                          rounded={"none"}
                          h={"100%"}
                          style={{
                            backgroundColor: bgColor,
                          }}
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
          position={"relative"}
          zIndex={1}
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
    </SafeAreaView>
  );
};

export default Header;
