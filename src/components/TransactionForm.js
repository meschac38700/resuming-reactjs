import Input from "./forms/Input";
import Select from "./forms/Select";
import { transactionTypes } from "../utils/functions";
import { FormProvider, useForm } from "react-hook-form";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";

const TransactionForm = forwardRef(
	({ addTransaction, onCancel, ...props }, ref) => {
		const formRef = useRef(null);
		const methods = useForm();

		/**
		 * Execute addTransaction callback to process new transaction
		 * @param {SubmitEvent} e
		 */
		const handleFormSubmit = methods.handleSubmit((transactionData) => {
			addTransaction({
				...transactionData,
				amount: Number.parseInt(transactionData.amount),
			});
		});

		useImperativeHandle(ref, () => ({
			clearForm: () => formRef.current?.reset(),
			formData: () => new FormData(formRef.current),
		}));

		return (
			<div className="shadow p-3 bg-white rounded" {...props}>
				<h4 className="title mb-4">Transaction</h4>
				<FormProvider {...methods}>
					<form
						ref={formRef}
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
						<div className="d-flex mt-4">
							<button
								type="submit"
								onClick={handleFormSubmit}
								className="btn btn-primary"
							>
								Submit transaction
							</button>
							<button
								type="submit"
								onClick={onCancel}
								className="btn btn-secondary mx-auto"
							>
								Cancel
							</button>
						</div>
					</form>
				</FormProvider>
			</div>
		);
	}
);

const AddTransaction = forwardRef(({ onSubmit }, ref) => {
	const [showForm, setShowForm] = useState(false);

	const cancelForm = (e) => {
		e.preventDefault();
		setShowForm(false);
	};
	return (
		<>
			<TransactionForm
				style={{ display: showForm ? "block" : "none" }}
				ref={ref}
				addTransaction={onSubmit}
				onCancel={cancelForm}
			/>
			<button
				style={{ display: !showForm ? "block" : "none", width: "max-content" }}
				className="btn btn-primary"
				onClick={setShowForm}
			>
				New transaction
			</button>
		</>
	);
});
AddTransaction.displayName = "AddTransaction";
export default AddTransaction;
