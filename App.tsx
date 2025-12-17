import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { store } from "./src/store";
import TaskListScreen from "./src/screens/TaskListScreen";
import AddTaskScreen from "./src/screens/AddTaskScreen";
import HeaderSection from "./src/components/HeaderSection";
import ThemeContextProvider from "./src/context/ThemeContextProvider";

type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ThemeContextProvider>
          <Stack.Navigator
            initialRouteName="TaskList"
            screenOptions={{
              headerShown:false
            }}
          >
            <Stack.Screen
              name="TaskList"
              component={TaskListScreen}
              options={{ title: "My Tasks" }}
            />
            <Stack.Screen
              name="AddTask"
              component={AddTaskScreen}
              options={{ title: "Add New Task" }}
            />
          </Stack.Navigator>
        </ThemeContextProvider>
      </NavigationContainer>
    </Provider>
  );
}
