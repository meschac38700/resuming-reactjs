import { useMemo } from "react";

/**
 * Compute expense and income transaction amounts
 * @param {Array<{id: Number, name: String, amount: Number, type: 'income' | 'expense'}>} transactionHistory
 * @returns Number[]
 */
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
