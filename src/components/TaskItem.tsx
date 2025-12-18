import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ITheme, Task } from "../types";
import useStyles from "../hooks/useStyles";
import moment from "moment";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const styles = useStyles();
  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(task.id),
      },
    ]);
  };

  return (
    <View key={task.createdAt} style={styles.taskItemSection.container}>
      <TouchableOpacity
        style={styles.taskItemSection.checkbox}
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.taskItemSection.checkboxInner,
            task.completed && styles.taskItemSection.checkboxChecked,
          ]}
        >
          {task.completed && (
            <Text style={styles.taskItemSection.checkmark}>✓</Text>
          )}
        </View>
      </TouchableOpacity>

      <View style={styles.taskItemSection.content}>
        <Text
          style={[
            styles.taskItemSection.title,
            task.completed && styles.taskItemSection.completedText,
          ]}
        >
          {task.title}
        </Text>
        {task.description ? (
          <Text
            style={[
              styles.taskItemSection.description,
              task.completed && styles.taskItemSection.completedText,
            ]}
          >
            {task.description}
          </Text>
        ) : null}
        {task.dueDate && (
          <Text style={styles.taskItemSection.dueDate}>
            Due: {moment(task.dueDate?.toString()).format("ddd D MMM YYYY HH:mm")}
          </Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.taskItemSection.deleteBtn}
        onPress={handleDelete}
        activeOpacity={0.7}
      >
        <Text style={styles.taskItemSection.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TaskItem;
