import { FlatList } from "react-native-gesture-handler";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData: any) {
  return <ExpenseItem {...itemData.item} />;
}

export default function ExpensesList({ expenses }: { expenses: any[] }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}
