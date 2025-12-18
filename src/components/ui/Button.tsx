import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useStyles from "../../hooks/useStyles";

type props = {
  variant: "primary" | "secondary";
  title: string;
} & React.ComponentProps<typeof TouchableOpacity>;
const Button = ({ variant, title, ...props }: props) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      style={
        variant === "primary"
          ? styles.addTaskScreen.addButton
          : styles.addTaskScreen.cancelButton
      }
      {...props}
    >
      <Text
        style={
          variant === "primary"
            ? styles.addTaskScreen.addButtonText
            : styles.addTaskScreen.cancelButtonText
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
