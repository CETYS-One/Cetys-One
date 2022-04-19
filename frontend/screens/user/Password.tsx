import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import {
  Box,
  Text,
  VStack,
  FormControl,
  Input,
  Button,
  ChevronLeftIcon,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { RootStackParams } from "../Pages";
import * as Yup from "yup";
const Password = () => {
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
            Recuperar contraseña
          </Text>
        </VStack>
      </Box>
      <Box h="80%" background={"white"} borderTopRadius={20} mt={-4}>
        <Box w={"90%"} mx={"auto"} mt={10}>
          <Text fontWeight={"700"} fontSize={"15px"}>
            Si has olvidado tu contraseña no te preocupes, 
            sigue estos pasos para recuperar tu cuenta 
          </Text>
          
          <Box mt={10}>
            <Formik
              initialValues={{ id: "", password: "" }}
              onSubmit={(values) => console.log(values)}
              validationSchema={Yup.object({
                id: Yup.string().required("La matricula es requerida."),
                password: Yup.string().required("El correo es requerido."),
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
                    <FormControl.Label>Correo asociado a la cuenta</FormControl.Label>
                    <Input
                     
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
                    Enviar
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

export default Password;
