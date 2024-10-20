import Input from "./forms/Input";
import Select from "./forms/Select";
import { transactionTypes } from "../utils/functions";
import { FormProvider, useForm } from "react-hook-form";

export default function TransactionInput({ addTransaction }) {
	const methods = useForm();

	/**
	 * Execute addTransaction callback to process new transaction
	 * @param {SubmitEvent} e
	 */
	const handleFormSubmit = methods.handleSubmit((transactionData) => {
		debugger;
		addTransaction({
			...transactionData,
			amount: Number.parseInt(transactionData.amount),
		});
	});

	return (
		<div className="shadow p-3 bg-white rounded">
			<h4 className="title mb-4">Transaction</h4>
			<FormProvider {...methods}>
				<form
					className="form form-transaction"
					onSubmit={(e) => e.preventDefault()}
					noValidate
				>
					<Input
						label="Name"
						type="text"
						name="name"
						placeholder="Enter text..."
						required
					/>
					<Input
						label="Amount"
						type="number"
						name="amount"
						placeholder="Enter amount..."
						required
					/>
					<Select
						options={transactionTypes()}
						name="type"
						label="Transaction type"
						required
					/>
					<button
						type="submit"
						onClick={handleFormSubmit}
						className="btn btn-primary mx-auto my-2"
					>
						Submit transaction
					</button>
				</form>
			</FormProvider>
		</div>
	);
}
