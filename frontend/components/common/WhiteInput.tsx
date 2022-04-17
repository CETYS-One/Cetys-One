import { Input } from "native-base";
import { IInputProps } from "native-base/lib/typescript/components/primitives/Input/types";

const WhiteInput = ({ ...props }: IInputProps) => {
  return (
    <Input
      variant={"outline"}
      borderColor={"white"}
      _light={{
        placeholderTextColor: "white",
        _focus: {
          borderColor: "white",
        },
      }}
      placeholder={"Busca aqui"}
      style={{ color: "white" }}
      {...props}
    />
  );
};
export default WhiteInput;
