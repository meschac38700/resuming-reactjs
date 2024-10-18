import { useCallback } from "react";
import { Reorder } from "framer-motion";

const HistoryItem = function ({ item }) {
	const borderColor = item.type === "income" ? "#income" : "#dc3545";
	return (
		<div
			className={
				"history-item p-2 mb-2 bg-white shadow-sm border d-flex align-items-center justify-content-between " +
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

export default function History({ dataList, dispatcher }) {
	const setDataList = useCallback((state) => {
		let newState = state;
		if (typeof state === "function") {
			newState = state.apply();
		}
		dispatcher({ type: "reorder", newState });
	}, []);

	return (
		<div className="history shadow p-3 mb-5 bg-white rounded">
			<h4 className="title">History</h4>
			<Reorder.Group axis="y" values={dataList} onReorder={setDataList}>
				{dataList.map((item) => (
					<Reorder.Item key={item.id} value={item}>
						<HistoryItem key={item.id} item={item} />
					</Reorder.Item>
				))}
			</Reorder.Group>
		</div>
	);
}
