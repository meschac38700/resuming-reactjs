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

const historyData = [
	{ id: 1, name: "Cash", amount: 500, type: "income" },
	{ id: 2, name: "Book", amount: 500, type: "expense" },
	{ id: 3, name: "Camera", amount: 500, type: "expense" },
];

function App() {
	const [transactionForm, setTransactionForm] = useState(false);
	const [historyState, dispatcher] = useReducer(
		transactionReducer,
		historyData
	);

	const addTransaction = useCallback((transaction) => {
		const id = historyState.length + 1;
		const type = transaction.type === "income" ? "add" : "remove";
		dispatcher({
			type,
			newTransaction: { ...transaction, id },
		});
		setTransactionForm(false);
	});

	return (
		<div className="container mt-4">
			<Suspense fallback="Loading..">
				<Title title="Expense Tracker" centered />
				<Balance balance={260.005} />
				<IncomeExpense income={500.005} expense={240.005} />
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
