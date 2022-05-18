import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Center, Box, Spinner } from "native-base";
import { useCallback, useContext, useEffect } from "react";
import { Dimensions } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { IAuthNav } from "./navigators/MainNavigator";
import { AnimatedBox, AnimatedText } from "../components/common/Animated";
import MaskedView from "@react-native-community/masked-view";
import { ShopContext } from "../context/ShopProvider";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const LoadingSplash = () => {
  const dims = Dimensions.get("screen");

  const { handleStoreChange } = useContext(ShopContext);

  const { user, loadUserData, isLoadingUserData } = useAuth({
    onSuccessLoad: () => navigation.replace("Shop"),
    onSuccessLoadSeller: (store) => {
      handleStoreChange(store);
      navigation.replace("AllProducts");
    },
    onErrorLoad: () => navigation.replace("Welcome"),
  });

  const navigation = useNavigation<StackNavigationProp<IAuthNav>>();

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  // useEffect(() => {
  //   registerForPushNotificationsAsync();
  // }, []);

  // const registerForPushNotificationsAsync = async () => {
  //   const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //   if (status !== "granted") {
  //     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //   }
  // };

  return (
    <AnimatedBox
      w={dims.width}
      h={dims.height}
      backgroundColor={"amber.500"}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Center w={"100%"}>
        <Center h={"100%"}>
          <AnimatedText
            fontSize={24}
            fontWeight={"bold"}
            from={{ opacity: 0, translateY: 100 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "spring" }}
            color={"white"}
          >
            CETYS ONE
          </AnimatedText>
        </Center>
      </Center>
    </AnimatedBox>
  );
};

export default LoadingSplash;
