import { createContext } from "react";

const monthIndex = {
  "January": 0,
  "February": 1,
  "March": 2,
  "April": 3,
  "May": 4,
  "June": 5,
  "July": 6,
  "August": 7,
  "September": 8,
  "October": 9,
  "November": 10,
  "December": 11
}

export const dummyExpenses = [
  {
    id: "e1",
    description: "New Shoes",
    amount: 99.99,
    date: new Date(2021, monthIndex.December, 19),
  },
  {
    id: "e2",
    description: "New Shirt",
    amount: 49.99,
    date: new Date(2021, monthIndex.January, 5),
  },
  {
    id: "e3",
    description: "New Pants",
    amount: 69.69,
    date: new Date(2021, monthIndex.December, 1),
  },
  {
    id: "e4",
    description: "New Hat",
    amount: 29.99,
    date: new Date(2021, monthIndex.February, 19),
  },
  {
    id: "e5",
    description: "New Socks",
    amount: 9.59,
    date: new Date(2024, monthIndex.June, 17),
  },
];

export const ExpensesContext = createContext({
  expenses: [] as any[],
  addExpense: ({description, amount, date}: {description: string, amount: number, date: Date}) => {},
  removeExpense: (expenseId: string) => {},
  updateExpense: (expenseIs: string, {description, amount, date}: {description: string, amount: number, date: Date}) => {},
});