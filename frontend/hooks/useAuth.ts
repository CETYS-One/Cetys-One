import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useContext, useState } from "react";
import * as Keychain from "react-native-keychain";
import { useMutation, useQuery } from "react-query";
import { AuthContext } from "../context/AuthProvider";
import { RootStackParams } from "../screens/Pages";
import { IUser, IUserToken } from "../types/strapi";
import axios, { getErrorMessage } from "../util/axios";
import { getAxios } from "./useAxios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { boolean, string } from "yup";
import { IAuthNav } from "../screens/navigators/MainNavigator";

interface PropTypes {
  onSuccessLogin?: () => void;
  onSuccessLogout?: () => void;
  onSuccessLoad?: () => void;
  onErrorLoad?: () => void;
}
export const useAuth = ({
  onSuccessLogin,
  onSuccessLogout,
  onSuccessLoad,
  onErrorLoad,
}: PropTypes) => {
  const { user, setUserData } = useContext(AuthContext);
  const [isLoadingUserData, setIsLoadingUserData] = useState(false);

  const login = (username: string, password: string) => {
    handleLogin.mutate({ identifier: username, password });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userJwt");
    setUserData(undefined);
    onSuccessLogout && onSuccessLogout();
  };

  const handleLogin = useMutation(
    async (credentials: { identifier: string; password: string }) => {
      const res = await axios.post<IUserToken>("/auth/local", {
        ...credentials,
      });
      return res.data;
    },
    {
      onSuccess: async (data) => {
        await AsyncStorage.setItem("userJwt", data.jwt);
        setUserData(data);
        onSuccessLogin && onSuccessLogin();
      },
    }
  );

  const handleUserData = useMutation(
    async (token: string) => {
      const res = await getAxios(token).get<IUser>("users/me");
      return { jwt: token, user: res.data };
    },
    {
      onSuccess: (data, vars) => {
        setUserData(data);
        setIsLoadingUserData(false);
        onSuccessLoad && onSuccessLoad();
      },
      onError: (error: AxiosError) => {
        setIsLoadingUserData(false);
        onErrorLoad && onErrorLoad();
      },
    }
  );

  const loadUserData = async () => {
    setIsLoadingUserData(true);
    const jwt = await AsyncStorage.getItem("userJwt");
    if (!jwt) {
      setIsLoadingUserData(false);
      onErrorLoad && onErrorLoad();
      return;
    }
    handleUserData.mutate(jwt);
  };

  return {
    login,
    logout,
    user,
    loadUserData,
    isLoadingUserData,
    isSigningIn: handleLogin.isLoading,
  };
};
