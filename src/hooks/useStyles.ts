import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContextProvider";
import { StyleSheet } from "react-native";

export default () => {
  const theme = useContext(ThemeContext);
  return {
    //AddTaskScrren
    addTaskScreen: StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      scrollContent: {
        flexGrow: 1,
        marginTop:70
      },
      form: {
        padding: theme.spacing.lg,
      },
      label: {
        fontSize: theme.fontSizes.md,
        fontWeight: "bold",
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.sm,
        marginTop: theme.spacing.md,
      },
      input: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 12,
        padding: theme.spacing.md,
        fontSize: theme.fontSizes.md,
        color: theme.colors.textPrimary,
      },
      textArea: {
        height: 100,
        paddingTop: theme.spacing.md,
      },
      addButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: 12,
        alignItems: "center",
        marginTop: theme.spacing.xl,
      },
      addButtonText: {
        color: theme.colors.surface,
        fontSize: theme.fontSizes.md,
        fontWeight: "bold",
      },
      cancelButton: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: 12,
        alignItems: "center",
        marginTop: theme.spacing.md,
        borderWidth: 1,
        borderColor: theme.colors.border,
      },
      cancelButtonText: {
        color: theme.colors.textSecondary,
        fontSize: theme.fontSizes.md,
        fontWeight: "600",
      },
    }),

    //TaskListscreen
    taskListScreen: StyleSheet.create({
      wrapper: {},
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      },
      listContent: {
        paddingVertical: theme.spacing.md,
        paddingBottom: 100,
      },
      header: {
        paddingHorizontal: theme.spacing.md,
        paddingBottom: theme.spacing.md,
      },
      addButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: 12,
        alignItems: "center",
      },
      addButtonText: {
        color: theme.colors.surface,
        fontSize: theme.fontSizes.md,
        fontWeight: "bold",
      },
    }),

    //EmptytasksComponent
    emptyTasksComponent: StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing.xl,
      },
      emoji: {
        fontSize: 64,
        marginBottom: theme.spacing.md,
      },
      title: {
        fontSize: theme.spacing.xl,
        fontWeight: "bold",
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.sm,
      },
      subtitle: {
        fontSize: theme.spacing.md,
        color: theme.colors.textSecondary,
        textAlign: "center",
      },
    }),
    //Floatingactionbar
    floatingActionBar: StyleSheet.create({
      fab: {
        position: "absolute",
        right: theme.spacing.lg,
        bottom: theme.spacing.lg,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.primary,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
      },
      fabRecording: {
        backgroundColor: theme.colors.danger,
      },
      icon: {
        color: theme.colors.surface,
        fontSize: 28,
        fontWeight: "bold",
      },
      recordingIndicator: {
        justifyContent: "center",
        alignItems: "center",
      },
    }),
    //HeaderSection
    headerSectionComponent: StyleSheet.create({
      wrapper: {
        backgroundColor: theme.colors.primary,
        width: "100%",
        paddingVertical: 20,
        paddingTop: 70,
        gap:40,
        paddingHorizontal: theme.spacing.md,
      },
      header:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%"
      },
      menuOptions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      },
      title: {
        color: theme.colors.surface,
        fontWeight: "bold",
        fontSize: theme.spacing.md,
      },
      smallTitle: {
        color: theme.colors.surface,
        fontSize: 12,
      },
      searchInputWrapper:{
        width:"100%",
        height:54,
        borderRadius:12,
        backgroundColor:"#fff"
      },
      addBtn: {
        width: 30,
        height: 30,
        // borderColor: theme.colors.border,
        // borderWidth: 1,
        // backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
      },
      addIcon: {
        color: theme.colors.surface,
        fontSize: theme.fontSizes.sm,
      },
    }),

    //taskItemsection
    taskItemSection: StyleSheet.create({
      container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        marginHorizontal: theme.spacing.md,
        marginVertical: theme.spacing.xs,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      },
      checkbox: {
        marginRight: theme.spacing.md,
      },
      checkboxInner: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
      },
      checkboxChecked: {
        backgroundColor: theme.colors.primary,
      },
      checkmark: {
        color: theme.colors.surface,
        fontSize: theme.fontSizes.md,
        fontWeight: "bold",
      },
      content: {
        flex: 1,
      },
      title: {
        fontSize: theme.fontSizes.md,
        color: theme.colors.textPrimary,
        fontWeight: "500",
      },
      description: {
        fontSize: theme.fontSizes.sm,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
      },
      dueDate: {
        fontSize: theme.fontSizes.sm,
        color: theme.colors.warning,
        marginTop: theme.spacing.xs,
        fontStyle: "italic",
      },
      completedText: {
        textDecorationLine: "line-through",
        color: theme.colors.completed,
      },
      deleteBtn: {
        padding: theme.spacing.sm,
        marginLeft: theme.spacing.sm,
      },
      deleteText: {
        fontSize: theme.fontSizes.lg,
        color: theme.colors.danger,
        fontWeight: "bold",
      },
    }),
  };
};
