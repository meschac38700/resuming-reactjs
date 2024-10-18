import { useMemo } from "react";

export default function useIncomeExpense(transactionHistory) {
	const expense = useMemo(
		() =>
			transactionHistory.reduce(
				(sum, trans) => (trans.type === "expense" ? trans.amount + sum : sum),
				0
			),
		[transactionHistory]
	);
	const income = useMemo(
		() =>
			transactionHistory.reduce(
				(sum, trans) => (trans.type === "income" ? trans.amount + sum : sum),
				0
			),
		[transactionHistory]
	);
	return [income, expense];
}
