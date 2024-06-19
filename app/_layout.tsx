import { Colors } from "@/constants/Colors";
import { dummyExpenses, ExpensesContext } from "@/store/expenses-context";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useReducer } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function expensesReducer(state: any, action: any) {
  switch (action.type) {
    case "ADD":
      const id = new Date().getTime().toString();
      return [{ ...action.payload, id: id }, ...state];
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

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const addExpenseHandler = (expenseData: {
    description: string;
    amount: number;
    date: Date;
  }) => {
    dispatch({ type: "ADD", payload: expenseData });
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

  const [expensesState, dispatch] = useReducer(expensesReducer, dummyExpenses);

  const value = {
    expenses: expensesState,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
    updateExpense: updateExpenseHandler,
  };

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ExpensesContext.Provider value={value}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: "white",
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="manageExpense"
            options={{
              presentation: "modal",
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GestureHandlerRootView>
    </ExpensesContext.Provider>
  );
}
