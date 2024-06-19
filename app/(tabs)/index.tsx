import ExpensesOutput from "@/components/ExpensesOutput";
import ErrorOverlay from "@/components/ui/ErrorOverlay";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import { ExpensesContext } from "@/store/expenses-context";
import { getDateMinusDays } from "@/utils/date";
import { getExpenses } from "@/utils/http";
import { useContext, useEffect, useState } from "react";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function fetchExpenses() {
      setLoading(true);
      try {
        const expenses = await getExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses. Please try again later.");
      }
      setLoading(false);
    }

    fetchExpenses();
  }, []);

  if (error && !loading) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  if (loading) {
    return <LoadingOverlay />;
  }

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
