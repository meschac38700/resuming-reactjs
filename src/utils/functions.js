const transactionTypes = () => [
	{ text: "Income", value: "income", selected: true },
	{ text: "Expense", value: "expense", selected: false },
];

/**
 * Extract form data
 * @param {HTMLFormElement} form
 * @returns Object
 */
const extractFormData = (form) => {
	const fd = new FormData(form);
	const data = {};
	for (const [key, value] of fd.entries()) {
		data[key] = value;
	}
	return data;
};
export { transactionTypes, extractFormData };
