import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "@jamsch/expo-speech-recognition";
import TaskItem from "../components/TaskItem";
import EmptyState from "../components/EmptyState";
import FloatingActionButton from "../components/FloatingActionButton";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  loadTasks,
  saveTasks,
  toggleTask,
  deleteTask,
  addTask,
  sortTasksByDueDate,
} from "../store/tasksSlice";
import { parseTasksFromText } from "../utils/taskParser";
import { ITheme, Task } from "../types";
import { ThemeContext } from "../context/ThemeContextProvider";
import useStyles from "../hooks/useStyles";
import HeaderSection from "../components/HeaderSection";
import useDebounce from "../hooks/useDebounce";

type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
};

type TaskListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "TaskList"
>;

interface Props {
  navigation: TaskListScreenNavigationProp;
}

const TaskListScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { items: tasks, loading } = useAppSelector((state) => state.tasks);
  const [filteredTasks, setFilteredtasks] = useState(tasks);
  const theme = useContext(ThemeContext);
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const styles = useStyles();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [filterAlignment, setFilterAlignment] = useState<"asc" | "desc">("asc");

  const handleToggleTask = (id: string) => {
    dispatch(toggleTask(id));
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleVoiceInput = async () => {
    if (recording) {
      ExpoSpeechRecognitionModule.stop();
      handleVoiceResult();
      return;
    }
    try {
      const { status } =
        await ExpoSpeechRecognitionModule.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please enable microphone access to use voice input."
        );
        return;
      }

      setRecording(true);

      ExpoSpeechRecognitionModule.start({
        lang: "en-US",
        interimResults: true,
        maxAlternatives: 1,
        continuous: false,
        requiresOnDeviceRecognition: false,
        addsPunctuation: false,
        contextualStrings: ["Carlsen", "Nepomniachtchi", "Praggnanandhaa"],
      });
    } catch (error) {
      console.error("Voice input error:", error);
      Alert.alert("Error", "Failed to process voice input. Please try again.");
    }
  };

  const handleVoiceResult = () => {
    if (!transcript || transcript.trim().length === 0) {
      Alert.alert("No Input", "No speech detected. Please try again.");
      return;
    }

    const parsedTasks = parseTasksFromText(transcript);
    if (parsedTasks.length === 1) {
      dispatch(addTask({ title: parsedTasks[0] }));
      Alert.alert("Success", "Task added successfully!");
    } else {
      parsedTasks.forEach((taskTitle) => {
        dispatch(addTask({ title: taskTitle }));
      });
      Alert.alert("Success", `${parsedTasks.length} tasks added successfully!`);
    }
  };

  const renderHeader = () => (
    <View style={styles.taskListScreen.header}>
      <TouchableOpacity
        style={styles.taskListScreen.addButton}
        onPress={() => navigation.navigate("AddTask")}
      >
        <Text style={styles.taskListScreen.addButtonText}>+ Add Task</Text>
      </TouchableOpacity>
    </View>
  );

  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggle={handleToggleTask}
      onDelete={handleDeleteTask}
    />
  );

  const formatTasksByDueDate = (alignment: "asc" | "desc") =>
    setFilteredtasks((tasks) => sortTasksByDueDate(tasks, alignment));

  useSpeechRecognitionEvent("start", () => setRecording(true));
  useSpeechRecognitionEvent("end", () => {
    setRecording(false);
  });
  useSpeechRecognitionEvent("result", (event) => {
    setTranscript(event.results[0].transcript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error messsage:", event.message);
  });

  useEffect(() => {
    dispatch(loadTasks());
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(loadTasks());
    });

    return unsubscribe;
  }, [dispatch, navigation]);

  // Auto-save tasks whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      dispatch(saveTasks(tasks));
    }
  }, [tasks, dispatch]);

  useEffect(() => {
    if (debouncedSearchText) {
      setFilteredtasks(
        tasks?.filter(
          (task) =>
            task?.title?.toLowerCase()?.includes(debouncedSearchText) ||
            task?.description?.toLowerCase()?.includes(debouncedSearchText)
        )
      );
    } else {
      setFilteredtasks(tasks);
    }
  }, [debouncedSearchText]);

  useEffect(() => {
    setFilteredtasks(tasks)
  }, [tasks]);

  if (loading) {
    return (
      <View style={styles.taskListScreen.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.taskListScreen.container}>
      <HeaderSection
        searchText={searchText}
        setSearchText={setSearchText}
        formatTasksByDueDate={formatTasksByDueDate}
        filterAlignment={filterAlignment}
        setFilterAlignment={setFilterAlignment}
      />
      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.taskListScreen.listContent}
        ListEmptyComponent={() => <EmptyState />}
      />

      <FloatingActionButton
        onPress={handleVoiceInput}
        icon={recording ? "❌" : "🎤"}
        recording={recording}
      />
    </View>
  );
};

export default TaskListScreen;
