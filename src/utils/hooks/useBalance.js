import { useState, useCallback } from "react";

/**
 * UPdate the current balance state
 * @param {Number} amount
 * @param {Number} currentBalance
 * @param {'income' | 'expenses'} transactionType
 */
function getNewBalance(amount, currentBalance, transactionType) {
	if (transactionType === "income") {
		return currentBalance + amount;
	}

	const newBalance = currentBalance - amount;
	if (newBalance < 0) {
		throw new Error("Transaction failed due to insufficient balance !");
	}

	return newBalance;
}

/**
 * Manage balance state
 * @param {Number} initialBalance
 * @returns (Number | Function)[]
 */
export default function useBalance(initialBalance) {
	const [balance, setBalance] = useState(initialBalance);

	const updateBalance = useCallback((amount, transactionType) => {
		const newBalance = getNewBalance(amount, balance, transactionType);
		setBalance(newBalance);
	});

	return [balance, updateBalance];
}
