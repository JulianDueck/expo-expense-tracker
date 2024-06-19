import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../ui/Button";
import { getFormattedDate } from "@/utils/date";
import { Colors } from "@/constants/Colors";

type ExpenseFormProps = {
  submitButtonLabel: string;
  onCancel: () => void;
  onSubmit: (expenseData: {
    description: string;
    amount: number;
    date: Date;
  }) => void;
  expense?: {
    description: string;
    amount: number;
    date: Date;
  };
};

export default function ExpenseForm(
  this: any,
  { submitButtonLabel, onCancel, onSubmit, expense }: ExpenseFormProps
) {
  const [inputs, setInputs] = useState({
    description: {
      value: expense ? expense.description : "",
      isValid: true,
    },
    amount: {
      value: expense ? expense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: expense ? getFormattedDate(expense.date) : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier: string, enteredValue: string) {
    setInputs((cuerrntInputValues) => {
      return {
        ...cuerrntInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  const submitHandler = () => {
    const amount = parseFloat(inputs.amount.value);
    const date = new Date(inputs.date.value);
    const description = inputs.description.value.trim();

    const amountIsValid = amount > 0 && !isNaN(amount);
    const dateIsValid = date.toString() !== "Invalid Date";
    const descriptionIsValid = description.length > 0;
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((cuerrntInputValues) => {
        return {
          amount: {
            value: cuerrntInputValues.amount.value,
            isValid: amountIsValid,
          },
          date: { value: cuerrntInputValues.date.value, isValid: dateIsValid },
          description: {
            value: cuerrntInputValues.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit({
      description: description,
      amount: amount,
      date: date,
    });
  };

  const formIsValid =
    inputs.amount.isValid && inputs.date.isValid && inputs.description.isValid;

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>Your Expense</Text>
      <Input
        textInputOptions={{
          onChangeText: inputChangedHandler.bind(this, "description"),
          multiline: true,
          value: inputs.description.value,
        }}
        invalid={!inputs.description.isValid}
      >
        Description
      </Input>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          textInputOptions={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
          invalid={!inputs.amount.isValid}
        >
          Amount
        </Input>
        <Input
          style={styles.rowInput}
          textInputOptions={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
          invalid={!inputs.date.isValid}
        >
          Date
        </Input>
      </View>
      {!formIsValid && (
        <Text style={styles.errorText}>Invalid input values</Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  formContainer: {
    marginTop: 4,
  },
  title: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 100,
    marginHorizontal: 8,
  },
  errorText: {
    color: Colors.error500,
    textAlign: "center",
    margin: 8,
  },
});
