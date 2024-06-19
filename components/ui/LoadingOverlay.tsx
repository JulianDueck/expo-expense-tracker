import { Colors } from "@/constants/Colors";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingOverlay() {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.primary700,
  },
});
