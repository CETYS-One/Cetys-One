import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoadingSplash from "../LoadingSlapsh";
import Login from "../user/Login";
import SignUp from "../user/SignUp";
import Welcome from "../user/Welcome";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../user/Profile";
import Cart from "../shop/Cart";
import OrderHistory from "../shop/OrderHistory";
import ShopNav from "./ShopNav";
import ShopNavs from "./ShopsNav";
import DrawerNav, { DrawerProperties } from "react-native-drawer";
import { Box, Button, Drawer, HStack, Spacer, Text, VStack } from "native-base";
import { useContext, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ShopContext } from "../../context/ShopProvider";
import { TouchableOpacity } from "react-native-gesture-handler";
import DrawerButton from "../../components/common/DrawerButton";
import DrawerContent from "../../components/common/Drawer";

export type UserNav = {
  ShopsNav: any;
  Profile: any;
  Cart: any;
  OrderHistory: any;
};

const UserNav = () => {
  const drawerRef = useRef<DrawerNav>(null);
  const { setDrawerRef, isDrawerOpen } = useContext(ShopContext);

  return (
    <>
      {/* @ts.ignore */}
      <DrawerNav
        content={<DrawerContent />}
        ref={(ref) => setDrawerRef(ref)}
        openDrawerOffset={0.4}
        panCloseMask={0.2}
        tweenEasing={"easeInOutCubic"}
      >
        <ShopNav />
      </DrawerNav>
    </>
  );
};

export default UserNav;
