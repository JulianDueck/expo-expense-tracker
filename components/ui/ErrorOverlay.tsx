import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

export default function ErrorOverlay({
  message,
  onConfirm,
}: {
  message: string;
  onConfirm: () => void;
}) {
  return (
    <View style={styles.overlay}>
      <Text style={[styles.text, styles.title]}>An error ocurred</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
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
  text: {
    textAlign: "center",
    marginBottom: 16,
    color: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
