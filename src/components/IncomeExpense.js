import { balanceToDollars } from "../utils/formatNumber";

export default function IncomeExpense({ income, expense }) {
	const formattedIncome = balanceToDollars(income);
	const formattedExpense = balanceToDollars(expense);

	return (
		<div
			className="shadow p-3 bg-white rounded row"
			style={{ padding: "0px !important" }}
		>
			<div
				className="text-center border-right col h2"
				style={{ borderRight: "1px solid #cdcdcd" }}
			>
				<h4 className="text-uppercase">Income</h4>
				<span className="text-success "> ${formattedIncome} </span>
			</div>
			<div className="text-center col h2">
				<h4 className="text-uppercase">Expense</h4>
				<span className="text-danger "> ${formattedExpense} </span>
			</div>
		</div>
	);
}
