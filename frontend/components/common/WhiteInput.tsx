import { Input } from "native-base";
import { IInputProps } from "native-base/lib/typescript/components/primitives/Input/types";
import { MutableRefObject } from "react";

const WhiteInput = ({
  handleRef,
  ...props
}: IInputProps & { handleRef: MutableRefObject<any> }) => {
  return (
    <Input
      // @ts-ignore
      ref={(ref: any) => (handleRef.current = ref)}
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
