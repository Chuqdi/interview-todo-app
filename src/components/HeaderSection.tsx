import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import ThemeToggle from "./ThemeToggle";
import useStyles from "../hooks/useStyles";
import { useState, useEffect, useRef, useContext } from "react";
import Feather from "@expo/vector-icons/Feather";
import Input from "./ui/Input";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { formatTasksByDueDate } from "../store/tasksSlice";
import ToggleCheckbox from "./ui/ToggleCheckbox";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ThemeContext } from "../context/ThemeContextProvider";

const HeaderSection = ({
  searchText,
  filterAlignment,
  setSearchText,
  setFilterAlignment,
  formatTasksByDueDate,
}: {
  searchText: string;
  filterAlignment: "asc" | "desc";
  setFilterAlignment: (value: "asc" | "desc") => void;
  formatTasksByDueDate: (value: "asc" | "desc") => void;
  setSearchText: (value: string) => void;
}) => {
  const styles = useStyles();
  const [showSearchInput, setShowSearchInput] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const { theme } = useContext(ThemeContext);
  const tasks = useAppSelector((state) => state.tasks);

  useEffect(() => {
    if (showSearchInput) {
      // Animate in
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 150, // Adjust this value based on your Input component height
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      // Animate out
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [showSearchInput]);

  return (
    <View style={styles.headerSectionComponent.wrapper}>
      <View style={styles.headerSectionComponent.header}>
        <Text style={styles.headerSectionComponent.title}>View Task</Text>
        <View style={styles.headerSectionComponent.menuOptions}>
          <ThemeToggle />
          {!!tasks?.items?.length && (
            <TouchableOpacity
              onPress={() => setShowSearchInput(!showSearchInput)}
              style={styles.headerSectionComponent.addBtn}
            >
              {showSearchInput ? (
                
                <AntDesign
                  name="close"
                  size={30}
                  color={theme === "dark" ? "#616161" : "#adadad"}
                />
              ) : (
               <Feather name="search"  size={30}
                  color={theme === "dark" ? "#616161" : "#adadad"} />
              )}

            </TouchableOpacity>
          )}
        </View>
      </View>

      <Animated.View
        style={{
          height: animatedHeight,
          opacity: animatedOpacity,
          overflow: "hidden",
          gap: 10,
        }}
      >
        <Input
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search tasks"
        />

        <View
          style={{
            gap: 10,
          }}
        >
          <Text style={styles.headerSectionComponent.title}>
            Format by due date
          </Text>

          <View>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: 5,
              }}
            >
              <Text style={styles.headerSectionComponent.smallTitle}>Asc:</Text>
              <ToggleCheckbox
                checked={filterAlignment === "asc"}
                onToggle={() => {
                  if (filterAlignment !== "asc") {
                    setFilterAlignment("asc");
                    formatTasksByDueDate("asc");
                  }
                }}
              />
            </View>

            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                gap: 5,
              }}
            >
              <Text style={styles.headerSectionComponent.smallTitle}>
                Descending:
              </Text>
              <ToggleCheckbox
                checked={filterAlignment === "desc"}
                onToggle={() => {
                  if (filterAlignment !== "desc") {
                    setFilterAlignment("desc");
                    formatTasksByDueDate("desc");
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default HeaderSection;
