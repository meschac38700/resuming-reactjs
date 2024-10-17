export const balanceToDollars = (balance) => {
	return Math.round((balance + Number.EPSILON) * 100) / 100;
};
