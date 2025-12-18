import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ITheme } from "../types";
import { ThemeContext } from "../context/ThemeContextProvider";
import useStyles from "../hooks/useStyles";

const EmptyState: React.FC = () => {
  const theme = useContext(ThemeContext);
  const styles = useStyles();

  return (
    <View testID="empty-state" style={styles.emptyTasksComponent.container}>
      <Text style={styles.emptyTasksComponent.emoji}>📝</Text>
      <Text style={styles.emptyTasksComponent.title}>No tasks yet</Text>
      <Text style={styles.emptyTasksComponent.subtitle}>
        Tap the + button to add your first task
      </Text>
    </View>
  );
};

export default EmptyState;
