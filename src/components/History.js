const HistoryItem = function ({ item }) {
	const borderColor = item.type === "income" ? "#income" : "#dc3545";
	return (
		<div
			className={
				"history-item shadow-sm p-2 mb-2 bg-white border d-flex align-items-center justify-content-between " +
				item.type.toLowerCase()
			}
			style={{ borderRight: `8px solid ${borderColor}` }}
		>
			<p className="mb-0">{item.name}</p>
			<span>
				{item.type === "income" ? "+" : "-"}
				{item.amount}
			</span>
		</div>
	);
};

export default function History({ dataList }) {
	return (
		<>
			<h4 className="title">History</h4>
			{dataList.map((item) => (
				<HistoryItem key={item.id} item={item} />
			))}
		</>
	);
}
