import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
import {
  Box,
  Button,
  ChevronLeftIcon,
  FormControl,
  Icon,
  Input,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import * as Yup from "yup";
import { ShopContext } from "../../context/ShopProvider";
import { useAuth } from "../../hooks/useAuth";
import { RootStackParams } from "../Pages";

const Login = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [show, setShow] = useState(false);
  const { handleStoreChange } = useContext(ShopContext);
  const { login, isSigningIn } = useAuth({
    onSuccessLogin: () =>
      navigation.reset({
        index: 0,
        routes: [{ name: "Shop" }],
      }),
    onSuccessLoginSeller: (store) => {
      handleStoreChange(store);
      navigation.replace("AllProducts");
    },
  });
  return (
    <Box>
      <Box h="28%" background={"amber.500"}>
        <VStack w={"90%"} margin={"auto"}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color="white" size={5} />
          </TouchableOpacity>
          <Text fontWeight={"700"} fontSize={"30px"} color="white" mt={5}>
            Iniciar Sesion
          </Text>
        </VStack>
      </Box>
      <Box h="82%" background={"white"} borderTopRadius={20} mt={-4}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Box
            w={"90%"}
            mx={"auto"}
            mt={10}
            h={Dimensions.get("screen").height + 20}
          >
            <Text fontWeight={"700"} fontSize={"23px"}>
              Bienvenido de vuelta!
            </Text>
            <Text fontWeight={"400"} fontSize={"13"} color={"gray.600"}>
              Hola! Inicia sesion para continuar
            </Text>
            <Box mt={10}>
              <Formik
                initialValues={{ id: "", password: "" }}
                onSubmit={(values) => login(values.id, values.password)}
                validationSchema={Yup.object({
                  id: Yup.string().required("La matricula es requerida."),
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
                  <>
                    <FormControl isInvalid={touched.id && !!errors.id}>
                      <FormControl.Label>Matricula</FormControl.Label>
                      <Input
                        onChangeText={handleChange("id")}
                        onBlur={handleBlur("id")}
                        value={values.id}
                      />
                      <FormControl.ErrorMessage>
                        {errors.id}
                      </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl
                      isInvalid={touched.password && !!errors.password}
                    >
                      <FormControl.Label>Contrase??a</FormControl.Label>
                      <Input
                        type="password"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("id")}
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
                      isLoading={isSigningIn}
                    >
                      Iniciar Sesion
                    </Button>
                    {/* <Button variant="ghost" colorScheme={"amber"} mt={5}>
                      Olvide mi contrasena
                    </Button> */}
                  </>
                )}
              </Formik>
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </Box>
  );
};

export default Login;
