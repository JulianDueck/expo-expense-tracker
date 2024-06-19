import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import { Colors } from "@/constants/Colors";
import { ExpensesContext } from "@/store/expenses-context";
import {
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ManageExpenseScreen() {
  const { expenseId } = useLocalSearchParams<{ expenseId: string }>();
  const navigation = useNavigation();
  const router = useRouter();
  const expensesCtx = useContext(ExpensesContext);

  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    expensesCtx.removeExpense(expenseId!);
    router.back();
  };

  const cancelHandler = () => {
    router.back();
  };

  const confirmHandler = () => {
    if (isEditing) {
      expensesCtx.updateExpense(expenseId!, {
        description: "Updated Expense",
        amount: 29.99,
        date: new Date(),
      });
    } else {
      expensesCtx.addExpense({
        description: "New Expense",
        amount: 39.99,
        date: new Date(),
      });
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={Colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary800,
    padding: 16,
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.primary200,
    alignItems: "center",
  },
});
