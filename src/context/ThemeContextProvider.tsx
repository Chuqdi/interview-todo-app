import { createContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import {
  DARK_COLORS,
  FONT_SIZES,
  LIGHT_COLORS,
  SPACING,
} from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

const themeKey = "APP-THEME";
export const ThemeContext = createContext<{
  theme?: "dark" | "light";
  setTheme: (value?: "dark" | "light") => void;
  colors: typeof DARK_COLORS;
  spacing: typeof SPACING;
  fontSizes: typeof FONT_SIZES;
}>({
  theme: "light",
  setTheme() {},
  colors: {} as typeof DARK_COLORS,
  spacing: {} as typeof SPACING,
  fontSizes: {} as typeof FONT_SIZES,
});
const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">();
  const colors = useMemo(
    () => (theme === "dark" ? DARK_COLORS : LIGHT_COLORS),
    [theme]
  );
  const colorScheme = useColorScheme();
  const setSchemeValue = (scheme?: "dark" | "light") => {
    setTheme(scheme);
    AsyncStorage.setItem(themeKey, scheme || "light");
  };
  useEffect(() => {
    const configureTheme = () => {
      AsyncStorage.getItem(themeKey).then((storedTheme) => {
        if (
          !!storedTheme &&
          (storedTheme === "dark" || storedTheme === "light")
        ) {
          setTheme(storedTheme);
        } else {
          setTheme(colorScheme || "light");
        }
      });
    };
    configureTheme();
  }, []);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setSchemeValue,
        colors,
        spacing: SPACING,
        fontSizes: FONT_SIZES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
