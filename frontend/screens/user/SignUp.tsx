import React from "react";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ErrorMessage, Formik } from "formik";
import {
  Box,
  Button,
  ChevronLeftIcon,
  FormControl,
  Input,
  ScrollView,
  Text,
  VStack,
  Icon
} from "native-base";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useMutation } from "react-query";
import * as Yup from "yup";
import Header from "../../components/common/Header";
import { RootStackParams } from "../Pages";
import axios, { getErrorMessage } from "../../util/axios";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";

const SignUp = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [show, setShow] = useState(false);
  const handleSignUp = useMutation(
    async (values: {
      id: string;
      name: string;
      email: string;
      password: string;
    }) =>
      await axios.post("/auth/local/register", {
        username: values.id,
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Exito!",
          text2: "Usuario registrado correctamente",
        });
        navigation.navigate("Login");
      },
      onError: (error: AxiosError) => {
        const message = getErrorMessage(error);
        Toast.show({
          type: "error",
          text1: "Erorr!",
          text2: message ?? "Hubo un error...",
        });
      },
    }
  );

  return (
    <Header title="Registrarse">
      <Box>
        <Text fontWeight={"700"} fontSize={"23px"}>
          Bienvenido!
        </Text>
        <Text fontWeight={"400"} fontSize={"13"} color={"gray.600"}>
          Crea una cuenta para que puedas empezar a pedir productos
        </Text>
        <Box h={"600px"} mt={10}>
          <Formik
            initialValues={{ id: "", name: "", email: "", password: "" }}
            onSubmit={(values) => handleSignUp.mutate(values)}
            validationSchema={Yup.object({
              id: Yup.string().required("La matricula es requerida."),
              name: Yup.string().required("El nombre es requerida."),
              email: Yup.string()
                .email("El correo debe de ser valido")
                .required("El correo es requerido"),
              password: Yup.string().required("La contrasena es requerida"),
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
              // @ts-ignore
              <KeyboardAwareScrollView
                extraScrollHeight={100}
                enableOnAndroid
                keyboardShouldPersistTaps="handled"
              >
                <ScrollView>
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
                  <FormControl isInvalid={touched.id && !!errors.id}>
                    <FormControl.Label>Matricula *</FormControl.Label>
                    <Input
                      onChangeText={handleChange("id")}
                      onBlur={handleBlur("id")}
                      value={values.id}
                    />
                    <FormControl.ErrorMessage>
                      {errors.id}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={touched.email && !!errors.email}>
                    <FormControl.Label>Correo Electronico *</FormControl.Label>
                    <Input
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                    <FormControl.ErrorMessage>
                      {errors.email}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <FormControl
                    isInvalid={touched.password && !!errors.password}
                  >
                    <FormControl.Label>Contraseña *</FormControl.Label>
                    <Input
                      type="password"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      type={show ? "text" : "password"} InputRightElement={<Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" onPress={() => setShow(!show)} />}

                    />
                    <FormControl.ErrorMessage>
                      {errors.password}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <Button
                    type="submit"
                    onPress={() => handleSubmit()}
                    borderRadius="10"
                    backgroundColor={"amber.500"}
                    mt={10}
                    py={4}
                    isLoading={handleSignUp.isLoading}
                  >
                    Crear Cuenta
                  </Button>
                </ScrollView>
              </KeyboardAwareScrollView>
            )}
          </Formik>
        </Box>
      </Box>
    </Header>
  );
};

export default SignUp;
