import { TextInput, StyleProp, TextStyle } from "react-native";
import useStyles from "../../hooks/useStyles";

type props = { extraStyles?: StyleProp<TextStyle> } & React.ComponentProps<
  typeof TextInput
>;
const Input = ({ extraStyles, ...props }: props) => {
  const styles = useStyles();
  return (
    <TextInput style={[styles.addTaskScreen.input, extraStyles]} {...props} />
  );
};

export default Input;
