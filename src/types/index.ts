export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
}

export interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  tasks: TasksState;
}

export interface ITheme {
  colors: {
    primary: string;
    primaryDark: string;
    success: string;
    danger: string;
    warning: string;
    background: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    completed: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  fontSizes: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
}
