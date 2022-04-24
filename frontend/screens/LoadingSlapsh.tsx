import { Dimensions } from "react-native";
import { Box, Center, Spinner } from "native-base";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "./Pages";
import { IAuthNav } from "./navigators/AuthNavigator";

const LoadingSplash = () => {
  const dims = Dimensions.get("screen");
  const { user, loadUserData, isLoadingUserData } = useAuth();

  const navigation = useNavigation<StackNavigationProp<IAuthNav>>();

  useEffect(() => {
    loadUserData(true);
  }, []);

  return (
    <Box w={dims.width} h={dims.height} backgroundColor={"gray.300"}>
      <Center w={"100%"}>
        <Center h={"100%"}>
          <Spinner color="black" />
        </Center>
      </Center>
    </Box>
  );
};

export default LoadingSplash;
