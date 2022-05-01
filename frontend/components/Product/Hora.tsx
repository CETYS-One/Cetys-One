import RNDateTimePicker from "@react-native-community/datetimepicker";
import { VStack, Text, TextArea } from "native-base";
import { useState } from "react";
import { format, addMinutes } from "date-fns";
interface PropTypes {
  value: string;
  onChange: (value: string) => void;
}

const Hora = ({ value, onChange }: PropTypes) => {
  const [show, setShow] = useState(false);

  return (
    <VStack space={"2"} alignItems={"center"}>
      <Text fontSize={"20px"}>Horario de Entrega</Text>

      <Text>{format(addMinutes(new Date(), 15), "p")}</Text>
      {show && (
        <RNDateTimePicker
          mode="time"
          value={new Date()}
          minimumDate={addMinutes(new Date(), 15)}
          onTouchCancel={() => setShow(false)}
        />
      )}
    </VStack>
  );
};

export default Hora;
