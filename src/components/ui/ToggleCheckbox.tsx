import React, { useRef, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  Animated,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Check } from "lucide-react-native";
import { DARK_COLORS, LIGHT_COLORS } from "../../constants/theme";
import { ThemeContext } from "../../context/ThemeContextProvider";

type CheckboxSize = "sm" | "md" | "lg";

interface ToggleCheckboxProps {
  checked?: boolean;
  onToggle?: (checked: boolean) => void;
  size?: CheckboxSize;
  disabled?: boolean;
  isDark?: boolean;
}

interface SizeConfig {
  box: number;
  icon: number;
  borderRadius: number;
}

const ToggleCheckbox: React.FC<ToggleCheckboxProps> = ({
  checked = false,
  onToggle,
  size = "md",
  disabled = false,
}) => {
  const { theme } = useContext(ThemeContext);
  const colors = theme === "dark" ? DARK_COLORS : LIGHT_COLORS;

  const scaleAnim = useRef(new Animated.Value(checked ? 1 : 0)).current;
  const backgroundColorAnim = useRef(
    new Animated.Value(checked ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: checked ? 1 : 0,
        friction: 6,
        tension: 100,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundColorAnim, {
        toValue: checked ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [checked]);

  const backgroundColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.surface, colors.success],
  });

  const borderColor = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.success],
  });

  const handlePress = (): void => {
    if (!disabled && onToggle) {
      onToggle(!checked);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[styles.container, disabled && styles.disabled]}
    >
      <Animated.View
        style={[
          styles.checkbox,
          {
            width: 20,
            height: 20,
            borderRadius: 6,
            backgroundColor,
            borderColor,
            borderWidth: 2,
          },
          disabled && { opacity: 0.5 },
        ]}
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            opacity: scaleAnim,
          }}
        >
          <Text style={{}}>✓</Text>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});

export default ToggleCheckbox;
