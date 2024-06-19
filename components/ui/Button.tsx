import { Colors } from "@/constants/Colors";
import {
  ButtonProps,
  Pressable,
  StyleSheet,
  Text,
  TextProps,
  View,
  ViewProps,
} from "react-native";

type CustomButtonProps = TextProps & {
  mode?: "flat";
  style?: ViewProps["style"];
};

export default function Button({
  onPress,
  children,
  mode,
  style,
}: CustomButtonProps) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.buttonContainer, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: Colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: Colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: Colors.primary200,
    borderRadius: 4,
  },
});
