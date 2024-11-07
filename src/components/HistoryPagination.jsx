import { useCallback, useMemo, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

class Paginator {
	constructor({
		currentPage = 1,
		totalItems = 10,
		pageSize = 5,
		maxVisiblePages = 5,
	}) {
		this.totalItems = totalItems;
		this.pageSize = pageSize;
		this.maxVisiblePages = maxVisiblePages;
		this.page = currentPage;
	}

	get nbPages() {
		return Math.ceil(this.totalItems / this.pageSize);
	}

	range() {
		const maxMid = Math.floor(this.maxVisiblePages / 2);

		if (this.page < maxMid + 1) {
			return [1, this.maxVisiblePages];
		}

		const even = this.maxVisiblePages % 2 === 0;
		let left,
			right = maxMid;
		/**
		 * 5
		 * 1, 2 [3] 4, 5
		 *
		 * 6
		 * 1, 2, [3] 4, 5, 6
		 */
		if (even) right += 1;

		let _start = this.page - left;
		if (_start <= 0) _start = 1;

		let _end = this.page + right;
		if (_end > this.nbPages) _end = this.nbPages;

		console.log("current page", this.page);
		return [_start, _end];
	}

	displayedPages() {
		const [start, end] = this.range();
		return Array.from({ length: end + 1 - start }, (_, index) => index + start);
	}
}

export default function HistoryPagination({
	currentPage,
	totalItems,
	pageSize,
	maxVisiblePages = 5,
}) {
	const [page, setPage] = useState(currentPage);

	const paginator = new Paginator({
		currentPage,
		totalItems,
		pageSize,
		maxVisiblePages,
	});
	const nbPages = useMemo(
		() => Math.ceil(totalItems / pageSize),
		[totalItems, pageSize]
	);
	const range = useMemo(() => {
		const maxMid = Math.floor(maxVisiblePages / 2);

		if (page < maxMid + 1) {
			return [1, maxVisiblePages];
		}

		const lastRange = [nbPages - maxVisiblePages || 1, nbPages];
		console.log("Last range", lastRange);
		console.log("Last range", lastRange);
		if (page >= lastRange[0] && page <= lastRange[1]) return lastRange;

		const even = maxVisiblePages % 2 === 0;
		let left = maxMid;
		let right = maxMid;
		/**
		 * 5
		 * 1, 2 [3] 4, 5
		 *
		 * 6
		 * 1, 2, [3] 4, 5, 6
		 */
		if (even) right += 1;

		let _start = page - left;
		if (_start <= 0) _start = 1;

		let _end = page + right;
		if (_end > nbPages) _end = nbPages;

		console.log("current page", page);
		return [_start, _end];
	}, [page, maxVisiblePages, nbPages]);

	const displayedPages = useMemo(() => {
		const [start, end] = range;
		return Array.from({ length: end + 1 - start }, (_, index) => index + start);
	}, [range]);

	console.log(range);
	console.log(displayedPages);
	return (
		<Pagination>
			<Pagination.First />
			<Pagination.Prev disabled={false} />
			{/*<Pagination.Item onClick={() => setPage(1)} active={page === 1}>
				{1}
			</Pagination.Item>*/}
			{/* {showPreviousEllipse() && allPages.length > 2 && <Pagination.Ellipsis />} */}

			{displayedPages.map((n) => (
				<Pagination.Item
					active={page === n}
					key={`pagination-page-item-${n}`}
					onClick={() => setPage(n)}
				>
					{n}
				</Pagination.Item>
			))}

			{/* {showNextEllipse() && allPages.length > 2 && <Pagination.Ellipsis />} */}
			{/*<Pagination.Item
				active={page === nbPages}
				onClick={() => setPage(nbPages)}
			>
				{nbPages}
			</Pagination.Item>*/}
			<Pagination.Next />
			<Pagination.Last />
		</Pagination>
	);
}
