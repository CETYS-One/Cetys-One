import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import { MotiView } from "moti";
import {
  Box,
  Text,
  VStack,
  FormControl,
  Input,
  Button,
  IconButton,
  ChevronLeftIcon,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { RootStackParams } from "../Pages";
import * as Yup from "yup";

const Login = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

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
        <Box w={"90%"} mx={"auto"} mt={10}>
          <Text fontWeight={"700"} fontSize={"23px"}>
            Bienvenido de vuelta!
          </Text>
          <Text fontWeight={"400"} fontSize={"13"} color={"gray.600"}>
            Hola! Inicia sesion para continuar
          </Text>
          <Box mt={10}>
            <Formik
              initialValues={{ id: "", password: "" }}
              onSubmit={(values) => console.log(values)}
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
                    <FormControl.Label>Contraseña</FormControl.Label>
                    <Input
                      type="password"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("id")}
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
                    backgroundColor={"amber.500"}
                    mt={10}
                    py={4}
                  >
                    Inicar Sesion
                  </Button>
                  <Button variant="ghost" colorScheme={"amber"} mt={5}>
                    Olvide mi contrasena
                  </Button>
                </>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
