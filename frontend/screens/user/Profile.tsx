import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik, yupToFormErrors } from "formik";
import {
  Box,
  Button,
  ChevronLeftIcon,
  FormControl,
  Input,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { stringify } from "qs";
import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useMutation } from "react-query";
import Header from "../../components/common/Header";
import { ShopContext } from "../../context/ShopProvider";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { getErrorMessage } from "../../util/axios";
import { RootStackParams } from "../Pages";
import * as Yup from "yup";
import { AxiosError } from "axios";

const Profile = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const { storeData } = useContext(ShopContext);
  const { user, loadUserData } = useAuth({
    onSuccessLoad: () => navigation.goBack(),
  });
  const axios = useAxios(user?.jwt);

  const handleProfileUpdate = useMutation(
    async (values: { name: string; password: string }) => {
      await axios.put(`users/${user?.user.id}`, {
        ...values,
        password: !values.password ? undefined : values.password,
      });
    },
    {
      onSuccess: () => {
        Toast.show({
          text1: "Exito",
          text2: "Perfil actualizado con exito",
          type: "success",
        });

        loadUserData();
      },
      onError: (err: AxiosError<any, any>) => {
        Toast.show({
          text1: "Error",
          text2: `No se pudo actualizar el perfil: ${getErrorMessage(err)}`,
          type: "error",
        });
      },
    }
  );
  return (
    <Header title="Perfil">
      <Box>
        <VStack space={2} mb={10}>
          <Text fontWeight={"bold"}>Correo:</Text>
          <Text>{user?.user.email}</Text>
          <Text fontWeight={"bold"}>Matricula:</Text>
          <Text>{user?.user.username}</Text>
        </VStack>
        <Formik
          initialValues={{
            name: user?.user.name ?? "",
            password: "",
          }}
          onSubmit={(values) => handleProfileUpdate.mutate(values)}
          validationSchema={Yup.object({
            name: Yup.string().required("El nombre es requerido"),
          })}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <FormControl isInvalid={touched.name && !!errors.name}>
                <FormControl.Label>Nombre *</FormControl.Label>
                <Input
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                <FormControl.ErrorMessage>
                  {errors.name}
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl isInvalid={touched.password && !!errors.password}>
                <FormControl.Label>Contraseña *</FormControl.Label>
                <Input
                  type="password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                />
                <FormControl.ErrorMessage>
                  {errors.password}
                </FormControl.ErrorMessage>
              </FormControl>
              <Button
                type="submit"
                onPress={() => handleSubmit()}
                borderRadius="10"
                isLoading={handleProfileUpdate.isLoading}
                backgroundColor={storeData?.color}
                mt={10}
                py={4}
              >
                Guardar Cambios
              </Button>
            </>
          )}
        </Formik>
      </Box>
    </Header>
  );
};

export default Profile;
