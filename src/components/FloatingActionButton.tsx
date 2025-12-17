import { TouchableOpacity, Text, View } from "react-native";
import useStyles from "../hooks/useStyles";

interface FloatingActionButtonProps {
  onPress: () => void;
  icon?: string;
  recording?: boolean;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onPress,
  icon = "+",
  recording = false,
}) => {
  const styles = useStyles();

  return (
    <TouchableOpacity
      style={[
        styles.floatingActionBar.fab,
        recording && styles.floatingActionBar.fabRecording,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {recording ? (
        <View style={styles.floatingActionBar.recordingIndicator}>
          <Text style={styles.floatingActionBar.icon}>🎤</Text>
        </View>
      ) : (
        <Text style={styles.floatingActionBar.icon}>{icon}</Text>
      )}
    </TouchableOpacity>
  );
};

export default FloatingActionButton;
