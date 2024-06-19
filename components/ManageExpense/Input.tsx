import { Colors } from "@/constants/Colors";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewProps,
} from "react-native";

type InputProps = {
  children: TextProps["children"];
  textInputOptions?: TextInputProps;
  style?: ViewProps["style"];
  invalid: boolean;
};

export default function Input({
  children,
  textInputOptions,
  style,
  invalid,
}: InputProps) {
  let inputStyles: object[] = [styles.input];
  if (textInputOptions?.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {children}
      </Text>
      <TextInput
        style={[inputStyles, invalid && styles.invalidInput]}
        {...textInputOptions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: Colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: Colors.primary700,
  },
  inputMultiline: {
    minHeight: 75,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: Colors.error500,
  },
  invalidInput: {
    backgroundColor: Colors.error50,
  },
});
