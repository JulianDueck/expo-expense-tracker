import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [] as {
    id: string;
    description: string;
    amount: number;
    date: Date;
  }[],
  addExpense: ({
    description,
    amount,
    date,
    id,
  }: {
    description: string;
    amount: number;
    date: Date;
    id: string;
  }) => {},
  setExpenses: (
    expenses: { description: string; amount: number; date: Date }[]
  ) => {},
  removeExpense: (expenseId: string) => {},
  updateExpense: (
    expenseId: string,
    {
      description,
      amount,
      date,
    }: { description: string; amount: number; date: Date }
  ) => {},
});

function expensesReducer(state: any, action: any) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return action.payload;
    case "DELETE":
      return state.filter((expense: any) => expense.id !== action.payload);
    case "UPDATE":
      const updateExpenseIndex = state.findIndex(
        (expense: any) => expense.id === action.payload.expenseId
      );
      const updateExpense = state[updateExpenseIndex];
      const updateItem = {
        ...updateExpense,
        description: action.payload.description,
        amount: action.payload.amount,
        date: action.payload.date,
      };
      const updatedExpenses = [...state];
      updatedExpenses[updateExpenseIndex] = updateItem;
      return updatedExpenses;
    default:
      return state;
  }
}

export function ExpensesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const addExpenseHandler = (expenseData: {
    description: string;
    amount: number;
    date: Date;
  }) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const setExpensesHandler = (
    expenses: { description: string; amount: number; date: Date }[]
  ) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const removeExpenseHandler = (expenseId: string) => {
    dispatch({ type: "DELETE", payload: expenseId });
  };

  const updateExpenseHandler = (
    expenseId: string,
    {
      description,
      amount,
      date,
    }: { description: string; amount: number; date: Date }
  ) => {
    dispatch({
      type: "UPDATE",
      payload: { expenseId, description, amount, date },
    });
  };

  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  const value = {
    expenses: expensesState,
    addExpense: addExpenseHandler,
    setExpenses: setExpensesHandler,
    removeExpense: removeExpenseHandler,
    updateExpense: updateExpenseHandler,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
