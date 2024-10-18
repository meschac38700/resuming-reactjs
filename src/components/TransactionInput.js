import { useRef, useCallback } from "react";
import Input from "./forms/Input";
import Select from "./forms/Select";

function extractFormData(form) {
	const fd = new FormData(form);
	const data = {};
	for (const [key, value] of fd.entries()) {
		data[key] = value;
	}
	return data;
}

export default function TransactionInput({ addTransaction }) {
	const formRef = useRef(null);

	/**
	 * Execute addTransaction callback to process new transaction
	 * @param {SubmitEvent} e
	 */
	const handleFormSubmit = useCallback((e) => {
		e.preventDefault();
		const transactionData = extractFormData(formRef.current);
		addTransaction({
			...transactionData,
			amount: Number.parseInt(transactionData.amount),
		});
	});
	const transactionTypes = [
		{ text: "Income", value: "income", selected: true },
		{ text: "Expense", value: "expense", selected: false },
	];

	return (
		<div className="mt-4 shadow p-3 mb-5 bg-white rounded">
			<h4 className="title mb-4">Transaction</h4>
			<form
				ref={formRef}
				className="form form-transaction"
				onSubmit={handleFormSubmit}
			>
				<Input
					label="Name"
					type="text"
					name="name"
					placeholder="Enter text..."
				/>
				<Input
					label="Amount"
					type="number"
					name="amount"
					placeholder="Enter amount..."
				/>
				<Select
					options={transactionTypes}
					name="type"
					label="Transaction type"
				/>
				<button type="submit" className="btn btn-primary mx-auto my-2">
					Submit transaction
				</button>
			</form>
		</div>
	);
}
