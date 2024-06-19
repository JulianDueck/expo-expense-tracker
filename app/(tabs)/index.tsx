import ExpensesOutput from "@/components/ExpensesOutput";
import { ExpensesContext } from "@/store/expenses-context";
import { getDateMinusDays } from "@/utils/date";
import { getExpenses } from "@/utils/http";
import { useContext, useEffect } from "react";

export default function HomeScreen() {
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function fetchExpenses() {
      const expenses = await getExpenses();
      expensesCtx.setExpenses(expenses);
    }

    fetchExpenses();
  }, []);

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
