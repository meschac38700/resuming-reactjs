import { useCallback, useEffect, useMemo, useState } from "react";
import { Reorder, motion, MotionConfig } from "framer-motion";
import HistoryPagination from "./HistoryPagination";

const HistoryItem = function ({ item }) {
	const borderColor = item.type === "income" ? "#income" : "#dc3545";
	const bgColor =
		item.type === "income" ? "rgba(0, 255,0,.05)" : "rgba(255,0,0,.05)";
	return (
		<div
			className={
				"history-item px-2 shadow-sm border d-flex align-items-center justify-content-between " +
				item.type.toLowerCase()
			}
			style={{
				borderRight: `8px solid ${borderColor}`,
				overflow: "hidden",
				height: "100%",
				backgroundColor: bgColor,
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

const PAGINATION = 5;
export default function History({ dataList }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [histories, setHistories] = useState([]);

	useEffect(() => {
		const pageIndex = currentPage - 1;
		const start = pageIndex * PAGINATION;
		const end = PAGINATION * currentPage;
		let paginatedItems = dataList.slice(start, end);
		if (paginatedItems.length === 0) {
			paginatedItems = dataList.slice(pageIndex);
		}
		setHistories(paginatedItems);
	}, [dataList, currentPage]);

	return (
		<div className="history shadow p-3 bg-white rounded">
			<h4 className="title">History</h4>
			<Reorder.Group axis="y" values={histories} onReorder={setHistories}>
				{histories.map((item) => (
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
			{dataList.length > PAGINATION && (
				<HistoryPagination
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					maxVisiblePages={5}
					pageSize={PAGINATION}
					items={dataList}
				/>
			)}
		</div>
	);
}
