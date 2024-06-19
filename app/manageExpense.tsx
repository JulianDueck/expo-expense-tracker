import ExpenseForm from "@/components/ManageExpense/ExpenseForm";
import IconButton from "@/components/ui/IconButton";
import { Colors } from "@/constants/Colors";
import { ExpensesContext } from "@/store/expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "@/utils/http";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function ManageExpenseScreen() {
  const { expenseId } = useLocalSearchParams<{ expenseId: string }>();
  const navigation = useNavigation();
  const router = useRouter();
  const expensesCtx = useContext(ExpensesContext);

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === expenseId
  );

  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    expensesCtx.removeExpense(expenseId!);
    await deleteExpense(expenseId!);
    router.back();
  };

  const cancelHandler = () => {
    router.back();
  };

  const confirmHandler = async (expenseData: {
    description: string;
    amount: number;
    date: Date;
  }) => {
    if (isEditing) {
      expensesCtx.updateExpense(expenseId, expenseData);
      await updateExpense(expenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({ ...expenseData, id: id });
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        expense={selectedExpense}
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
      />
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.primary200,
    alignItems: "center",
  },
});
