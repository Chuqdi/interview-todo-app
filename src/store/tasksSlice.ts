import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task, TasksState } from "../types";

const TASKS_STORAGE_KEY = "@tasks";

import moment from "moment";

export const sortTasksByDueDate = (tasks: Task[], order: "asc" | "desc" = "asc") => {
  if (!Array.isArray(tasks)) {
    return [];
  }

  // Create a copy to avoid mutating the original array
  const tasksCopy = [...tasks];

  return tasksCopy.sort((a, b) => {
    const hasADueDate = a.dueDate != null;
    const hasBDueDate = b.dueDate != null;

    // If both don't have due dates, maintain original order
    if (!hasADueDate && !hasBDueDate) {
      return 0;
    }

    // Tasks without due dates always come last
    if (!hasADueDate) {
      return 1; // a comes after b
    }

    if (!hasBDueDate) {
      return -1; // a comes before b
    }

    // Both have due dates, compare them
    const dateA = moment(a.dueDate);
    const dateB = moment(b.dueDate);

    if (order === "desc") {
      return dateB.valueOf() - dateA.valueOf(); // Descending
    } else {
      return dateA.valueOf() - dateB.valueOf(); // Ascending (default)
    }
  });
};

export const loadTasks = createAsyncThunk("tasks/loadTasks", async () => {
  try {
    const data = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
});

// Save tasks to AsyncStorage
export const saveTasks = createAsyncThunk(
  "tasks/saveTasks",
  async (tasks: Task[]) => {
    try {
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      return tasks;
    } catch (error) {
      console.error("Error saving tasks:", error);
      throw error;
    }
  }
);

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<Omit<Task, "id" | "createdAt" | "completed">>
    ) => {
      const newTask: Task = {
        id: Date.now().toString(),
        title: action.payload.title,
        description: action.payload.description || "",
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate: action.payload.dueDate,
      };
      state.items.push(newTask);
    },
    searchTaskByText: (state, action: PayloadAction<string>) => {
      state.items = state?.items?.filter(
        (task) =>
          task?.title?.toLowerCase()?.includes(action?.payload) ||
          task?.description?.toLowerCase()?.includes(action?.payload)
      );
    },
    formatTasksByDueDate: (state, action: PayloadAction<"asc" | "desc">) => {
      state.items = sortTasksByDueDate(state.items, action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Task> }>
    ) => {
      const index = state.items.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.updates,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = sortTasksByDueDate(action.payload);
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load tasks";
      })
      .addCase(saveTasks.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(saveTasks.rejected, (state, action) => {
        state.error = action.error.message || "Failed to save tasks";
      });
  },
});

export const { addTask, toggleTask, deleteTask,formatTasksByDueDate, updateTask, searchTaskByText } =
  tasksSlice.actions;
export default tasksSlice.reducer;
