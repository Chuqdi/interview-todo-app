import { useContext, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { ThemeContext } from "../context/ThemeContextProvider";

export default function ThemeToggle() {
  const [toggleAnim] = useState(new Animated.Value(0));
  const { theme, setTheme, colors } = useContext(ThemeContext);

  const toggleTheme = () => {
    const toValue = theme === "dark" ? 0 : 1;
    Animated.timing(toggleAnim, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleTranslate = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 28],
  });

  const styles = StyleSheet.create({
    toggleButton: {
      width: 56,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.border,
      justifyContent: "center",
    },
    toggleCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.surface,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <TouchableOpacity
      style={styles.toggleButton}
      onPress={toggleTheme}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.toggleCircle,
          { transform: [{ translateX: toggleTranslate }] },
        ]}
      >
        <Text>{theme === "dark" ? "🌚" : "🌞"}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}
