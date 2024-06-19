import ExpensesOutput from "@/components/ExpensesOutput";
import { dummyExpenses, ExpensesContext } from "@/store/expenses-context";
import { getDateMinusDays } from "@/utils/date";
import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

export default function HomeScreen() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const last7Days = getDateMinusDays(today, 7);
    return expense.date > last7Days;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallback="No expenses registered for the last 7 days."
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
