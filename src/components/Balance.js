import { balanceToDollars } from "../utils/formatNumber";

export default function Balance({ balance }) {
	const roundedBalance = balanceToDollars(balance);
	return (
		<div className="balance">
			<p className="mb-0 text-uppercase">Your Balance</p>
			<strong className="h1">${roundedBalance}</strong>
		</div>
	);
}
