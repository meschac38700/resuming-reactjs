import { useCallback, useMemo, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

/***
 * Calculate the current pagination range of pages to display
 */
function getPaginationRange(page, maxVisiblePages, nbPages) {
	if (nbPages <= maxVisiblePages) return [1, nbPages];

	const maxMid = Math.floor(maxVisiblePages / 2);

	if (page <= maxMid + 1) {
		return [1, maxVisiblePages];
	}

	const lastRange = [nbPages - maxVisiblePages || 1, nbPages];
	console.log("Last range", lastRange);
	console.log("Last range", lastRange);

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
	if (_start <= 1) _start = 2;

	let _end = page + right;
	if (_end > nbPages) _end = nbPages;

	if (nbPages - _start < maxVisiblePages - 1)
		_start = nbPages - maxVisiblePages + 1;

	return [_start, _end];
}

export default function HistoryPagination({
	currentPage,
	items,
	pageSize,
	onPageChange,
	maxVisiblePages = 5,
}) {
	const totalItems = useMemo(() => items.length, [items]);
	const nbPages = useMemo(
		() => Math.ceil(totalItems / pageSize),
		[totalItems, pageSize]
	);
	const range = useMemo(
		() => getPaginationRange(currentPage, maxVisiblePages, nbPages),
		[currentPage, maxVisiblePages, nbPages]
	);

	const displayedPages = useMemo(() => {
		const [start, end] = range;
		return Array.from({ length: end + 1 - start }, (_, index) => index + start);
	}, [range]);

	return (
		<Pagination>
			<Pagination.First onClick={() => onPageChange(1)} />
			<Pagination.Prev
				disabled={false}
				onClick={() => onPageChange((n) => (n > 1 ? --n : 1))}
			/>

			{displayedPages.map((n) => (
				<Pagination.Item
					active={currentPage === n}
					key={`pagination-page-item-${n}`}
					onClick={() => onPageChange(n)}
				>
					{n}
				</Pagination.Item>
			))}

			<Pagination.Next
				onClick={() => onPageChange((n) => (n < nbPages - 1 ? ++n : nbPages))}
			/>
			<Pagination.Last onClick={() => onPageChange(nbPages)} />
		</Pagination>
	);
}
