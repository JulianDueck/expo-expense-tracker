const API_URL = "https://expo-expense-tracker-app-default-rtdb.firebaseio.com/";

export async function storeExpense(expenseData: {
  description: string;
  amount: number;
  date: Date;
}) {
  const response = await fetch(API_URL + "expenses.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenseData),
  }).then((response) => response.json()).then((data) => {
    return data.name;
  });
  return response;
}

export async function getExpenses() {
  const response = await fetch(API_URL + "expenses.json")
    .then((response) => response.json())
    .then((data) => {
      const expenses = [];
      for (const key in data) {
        expenses.push({
          id: key,
          description: data[key].description,
          amount: data[key].amount,
          date: new Date(data[key].date),
        });
      }
      return expenses;
    });

  return response;
}

export function updateExpense(expenseId: string, expenseData: {
    description: string;
    amount: number;
    date: Date;
  }) {
    return fetch(API_URL + `expenses/${expenseId}.json`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseData),
    
    });
}

export function deleteExpense(expenseId: string) {
  return fetch(API_URL + `expenses/${expenseId}.json`, {
    method: "DELETE",
  });
}