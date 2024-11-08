import "./App.css";
import { Suspense, useCallback, useReducer, useRef } from "react";
import {
	Balance,
	Title,
	IncomeExpense,
	History,
	AddTransaction,
} from "./components";
import { transactionReducer } from "./utils/state/reducer";
import { useBalance, useIncomeExpense } from "./utils/hooks";

/**
 * @type {Array<{id: Number, name: String, amount: Number, type: 'income' | 'expense'}>}
 */
const historyData = [
	{
		id: 1,
		name: "Cash",
		amount: 1000,
		type: "income",
	},
	{
		id: 2,
		name: "Book",
		amount: 500,
		type: "expense",
	},
	{
		id: 3,
		name: "Camera",
		amount: 500,
		type: "expense",
	},
	{
		name: "Printer",
		amount: 566,
		type: "expense",
		id: 4,
	},
	{
		name: "Car",
		amount: 15000,
		type: "expense",
		id: 5,
	},
	{
		name: "TV",
		amount: 1255,
		type: "expense",
		id: 6,
	},
	{
		name: "Computer",
		amount: 1200,
		type: "expense",
		id: 7,
	},
	{
		name: "Portable computer",
		amount: 899,
		type: "expense",
		id: 8,
	},
	{
		name: "Playstation 5",
		amount: 550,
		type: "expense",
		id: 9,
	},
	{
		name: "XBox Serie X",
		amount: 499,
		type: "expense",
		id: 10,
	},
	{
		name: "ReactJS book",
		amount: 49,
		type: "expense",
		id: 11,
	},
];

function App() {
	const formRef = useRef(null);
	const [historyState, dispatcher] = useReducer(
		transactionReducer,
		historyData
	);
	const [balance, updateBalance] = useBalance(20506);

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
		formRef.current.clearForm();
	});

	return (
		<div className="container d-flex gap-3 flex-column">
			<Suspense fallback="Loading..">
				<Title title="Expense Tracker" centered />
				<Balance balance={balance} />
				<IncomeExpense income={incomeValue} expense={expenseValue} />
				<History dataList={historyState} />

				<AddTransaction ref={formRef} onSubmit={addTransaction} />
			</Suspense>
		</div>
	);
}

export default App;
