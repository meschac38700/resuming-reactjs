/**
 *
 * @param {Object[]} state
 * @param {Object} action
 * @returns
 */
export const transactionReducer = (state, action) => {
	switch (action.type) {
		case "add":
			return [...state, action.newTransaction];
		case "reorder":
			return [...action.newState];
		default:
			throw new Error(`Unavailable reducer action type: ${action.type}.`);
	}
};
