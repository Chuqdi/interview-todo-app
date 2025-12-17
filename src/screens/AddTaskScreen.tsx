import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch } from "../store/hooks";
import { addTask } from "../store/tasksSlice";
import { ThemeContext } from "../context/ThemeContextProvider";
import useStyles from "../hooks/useStyles";
import Input from "../components/ui/Input";
import moment from "moment";

type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
};

type AddTaskScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AddTask"
>;

interface Props {
  navigation: AddTaskScreenNavigationProp;
}

const AddTaskScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const theme = useContext(ThemeContext);
  const styles = useStyles();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddTask = () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a task title");
      return;
    }

    dispatch(
      addTask({
        title: title.trim(),
        description: description.trim(),
        dueDate: date.toString(),
      })
    );

    Alert.alert("Success", "Task added successfully!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.addTaskScreen.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.addTaskScreen.scrollContent}>
        <View style={styles.addTaskScreen.form}>
          <Text style={styles.addTaskScreen.label}>Task Title *</Text>
          <Input
            placeholder="Enter task title"
            placeholderTextColor={theme.colors.textSecondary}
            value={title}
            onChangeText={setTitle}
            autoFocus
          />

          <Text
            onPress={() => setShowDatePicker(true)}
            style={styles.addTaskScreen.label}
          >
            Description (Optional)
          </Text>
          <Input
            extraStyles={[styles.addTaskScreen.textArea]}
            placeholder="Enter task description"
            placeholderTextColor={theme.colors.textSecondary}
            onChangeText={setDescription}
            value={description}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.addTaskScreen.label}>Due date (Optional)</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker((value) => !value)}
          >
            <Input
              extraStyles={[
                {
                  pointerEvents: "none",
                },
              ]}
              placeholder="Enter task due date"
              placeholderTextColor={theme.colors.textSecondary}
              value={moment(date).format("ddd D MMM YYYY HH:mm")}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                // On Android, picker closes automatically after selection
                setShowDatePicker(Platform.OS === "ios");
                setDate(currentDate);
              }}
              minimumDate={new Date()}
            />
          )}

          <TouchableOpacity
            style={styles.addTaskScreen.addButton}
            onPress={handleAddTask}
            activeOpacity={0.8}
          >
            <Text style={styles.addTaskScreen.addButtonText}>Add Task</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addTaskScreen.cancelButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.addTaskScreen.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddTaskScreen;
