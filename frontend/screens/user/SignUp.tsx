import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik } from "formik";
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
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import Header from "../../components/common/Header";
import { RootStackParams } from "../Pages";

const SignUp = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

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
            onSubmit={(values) => console.log(values)}
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
                      type="email"
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
