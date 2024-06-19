import ExpenseForm from "@/components/ManageExpense/ExpenseForm";
import ErrorOverlay from "@/components/ui/ErrorOverlay";
import IconButton from "@/components/ui/IconButton";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { Colors } from "@/constants/Colors";
import { ExpensesContext } from "@/store/expenses-context";
import { deleteExpense, storeExpense, updateExpense } from "@/utils/http";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function ManageExpenseScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    setIsSubmitting(true);
    try {
      await deleteExpense(expenseId!);
      expensesCtx.removeExpense(expenseId!);
      router.back();
    } catch (error) {
      setError("Could not delete expense. Please try again later.");
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    router.back();
  };

  const confirmHandler = async (expenseData: {
    description: string;
    amount: number;
    date: Date;
  }) => {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateExpense(expenseId, expenseData);
        expensesCtx.updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id: id });
      }
      router.back();
    } catch (error) {
      setError("Could not save data. Please try again later.");
      setIsSubmitting(false);
    }
  };

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

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
