import { useCallback } from "react";
import { Reorder, motion, MotionConfig } from "framer-motion";

const HistoryItem = function ({ item }) {
	const borderColor = item.type === "income" ? "#income" : "#dc3545";
	return (
		<div
			className={
				"history-item px-2 bg-white shadow-sm border d-flex align-items-center justify-content-between " +
				item.type.toLowerCase()
			}
			style={{
				borderRight: `8px solid ${borderColor}`,
				overflow: "hidden",
				height: "100%",
			}}
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
						<MotionConfig transition={{ duration: 0.3 }}>
							<motion.div
								layout
								initial={{ opacity: 0, height: 0, margin: 0 }}
								animate={{ height: 42, opacity: 1, margin: 10 }}
							>
								<HistoryItem key={item.id} item={item} />
							</motion.div>
						</MotionConfig>
					</Reorder.Item>
				))}
			</Reorder.Group>
		</div>
	);
}
