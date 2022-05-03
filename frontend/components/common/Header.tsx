import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { AnimatePresence, MotiView } from "moti";
import {
  Box,
  Center,
  ChevronLeftIcon,
  FormControl,
  HamburgerIcon,
  HStack,
  Icon,
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
import React, {
  MutableRefObject,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button } from "react-native";
import { Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShopContext } from "../../context/ShopProvider";
import { RootStackParamList } from "../../types";
import { AnimatedBox } from "./Animated";
import WhiteInput from "./WhiteInput";
import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import MenuUser from "./Menu";
import MenuContent from "./Menu";

interface PropTypes {
  title: string;
  children: ReactNode;
  searchBar?: boolean;
  container?: boolean;
  isLoading?: boolean;
  bgColor?: string;
  isLoadingSearch?: boolean;
  showBack?: boolean;
  onSearch?: (value: string) => void;
  menuContent?: ReactNode;
}

const Header = (props: PropTypes) => {
  const {
    title,
    children,
    searchBar = false,
    container = true,
    isLoading = false,
    isLoadingSearch = false,
    onSearch,
    showBack = true,
    bgColor = "#f59e0b",
    menuContent = <></>,
  } = props;

  const inputRef = useRef<MutableRefObject<any>>(null);
  const [isSearchbarOpen, setIsSearchbarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();

  const { storeData } = useContext(ShopContext);

  const handleOpenSearchbar = () => {
    setIsSearchbarOpen(!isSearchbarOpen);
  };

  useEffect(() => {
    if (!isSearchbarOpen) return;

    (inputRef.current as any).focus();
  }, [isSearchbarOpen]);

  const handleSearch = () => {
    onSearch && onSearch(searchQuery);
  };

  return (
    <SafeAreaView style={{ backgroundColor: storeData?.color }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={false}
      >
        <Box height={"18%"} style={{ backgroundColor: storeData?.color }}>
          <VStack w={"90%"} margin={"auto"}>
            <MotiView animate={{ translateY: isSearchbarOpen ? -15 : 0 }}>
              <HStack>
                {showBack && (
                  <ChevronLeftIcon
                    color="white"
                    size={5}
                    onPress={() => navigation.goBack()}
                  />
                )}
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
                  from={{ translateX: -480 }}
                  animate={{ translateX: 0 }}
                  exit={{ translateX: -480 }}
                  transition={{ type: "timing", duration: 500 }}
                  style={{
                    position: "absolute",
                    bottom: -40,
                    right: 0,
                    left: 0,
                  }}
                >
                  <FormControl w="100%" mt={2} position={"relative"} zIndex={2}>
                    <HStack w="100%">
                      <WhiteInput
                        w="80%"
                        // borderRightRadius={0}
                        value={searchQuery}
                        rounded={0}
                        handleRef={inputRef}
                        onChange={(e) => setSearchQuery(e.nativeEvent.text)}
                      />
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                          borderColor: "white",
                          borderWidth: 1,
                          borderLeftWidth: 0,
                          borderTopRightRadius: 4,
                          borderBottomEndRadius: 4,
                        }}
                        onPress={() => !isLoadingSearch && handleSearch()}
                      >
                        {isLoadingSearch ? (
                          <Spinner color="white" />
                        ) : (
                          <Text color="white">Buscar</Text>
                        )}
                      </TouchableOpacity>
                      {/* <Button
                        // style={{
                        //   backgroundColor: bgColor,
                        // }}

                        title="Buscar"
                        onPress={handleSearch}
                        // isLoading={isLoadingSearch}
                      /> */}
                    </HStack>
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
          animate={{ translateY: isSearchbarOpen ? 50 : 0 }}
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
