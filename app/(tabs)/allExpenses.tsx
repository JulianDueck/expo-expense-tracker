import ExpensesOutput from "@/components/ExpensesOutput";
import { dummyExpenses, ExpensesContext } from "@/store/expenses-context";
import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

export default function TabTwoScreen() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesCtx.expenses}
      expensesPeriod="Total"
      fallback="No registered expenses found."
    />
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
