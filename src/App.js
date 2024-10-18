import "./App.css";
import { Suspense, useCallback, useReducer, useState } from "react";
import {
	Balance,
	Title,
	IncomeExpense,
	History,
	TransactionInput,
} from "./components";
import { transactionReducer } from "./utils/state/reducer";
import { useBalance, useIncomeExpense } from "./utils/hooks";

const historyData = [
	{ id: 1, name: "Cash", amount: 1000, type: "income" },
	{ id: 2, name: "Book", amount: 500, type: "expense" },
	{ id: 3, name: "Camera", amount: 500, type: "expense" },
];

function App() {
	const [transactionForm, setTransactionForm] = useState(false);
	const [historyState, dispatcher] = useReducer(
		transactionReducer,
		historyData
	);
	const [balance, updateBalance] = useBalance(41524);

	const [incomeValue, expenseValue] = useIncomeExpense(historyState);
	/**
	 * @param {{id: number, name: string, amount: number, type: 'income' | 'expense'}} transaction
	 */
	const addTransaction = useCallback((transaction) => {
		const id = historyState.length + 1;
		updateBalance(transaction.amount, transaction.type);
		dispatcher({
			type: "add",
			newTransaction: { ...transaction, id },
		});
		setTransactionForm(false);
	});

	return (
		<div className="container mt-4">
			<Suspense fallback="Loading..">
				<Title title="Expense Tracker" centered />
				<Balance balance={balance} />
				<IncomeExpense income={incomeValue} expense={expenseValue} />
				<History dataList={historyState} />

				{!transactionForm && (
					<button className="btn btn-primary" onClick={setTransactionForm}>
						New transaction
					</button>
				)}
				{transactionForm && (
					<TransactionInput addTransaction={addTransaction} />
				)}
			</Suspense>
		</div>
	);
}

export default App;
