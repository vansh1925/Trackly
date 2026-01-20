import api from './axios';

/**
 * @typedef {Object} Expense
 * @property {string} _id
 * @property {string} title
 * @property {number} amount
 * @property {string} date
 * @property {string} category
 * @property {string} [description]
 * @property {string} user
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} AddExpenseInput
 * @property {string} title
 * @property {number} amount
 * @property {string} date // ISO date string
 * @property {string} category
 * @property {string} [description]
 */

/**
 * @typedef {AddExpenseInput} UpdateExpenseInput
 */

function handleError(error) {
	const message = error?.response?.data?.message || error?.message || 'Request failed';
	const status = error?.response?.status;
	const data = error?.response?.data;
	const err = new Error(message);
	// attach useful context for callers
	err.status = status;
	err.data = data;
	throw err;
}

/**
 * Create a new expense
 * @param {AddExpenseInput} input
 * @returns {Promise<{ message: string, expense: Expense }>} 
 */
export async function addExpense(input) {
	try {
		const res = await api.post('/expenses/add', input);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

/**
 * Get a single expense by id
 * @param {string} id
 * @returns {Promise<{ message: string, expense: Expense }>} 
 */
export async function getExpense(id) {
	try {
		const res = await api.get(`/expenses/get/${id}`);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

/**
 * Get paginated expenses
 * @param {{ page?: number, limit?: number }} [params]
 * @returns {Promise<{ message: string, expenses: Expense[], page: number, totalpages: number, totalExpenses: number }>} 
 */
export async function getExpenses(params = {}) {
	try {
		const { page = 1, limit = 10 } = params;
		const res = await api.get('/expenses/getall', { params: { page, limit } });
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

/**
 * Update an existing expense
 * @param {string} id
 * @param {UpdateExpenseInput} input
 * @returns {Promise<{ message: string, expense: Expense }>} 
 */
export async function updateExpense(id, input) {
	try {
		const res = await api.put(`/expenses/update/${id}`, input);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

/**
 * Delete an expense by id
 * @param {string} id
 * @returns {Promise<{ message: string }>} 
 */
export async function deleteExpense(id) {
	try {
		const res = await api.delete(`/expenses/delete/${id}`);
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

/**
 * Get total expense for a period/value
 * @param {{ period: 'daily'|'monthly'|'yearly', value: string }} params
 * @returns {Promise<{ message: string, totalAmount: number }>} 
 */
export async function getTotalExpense(params) {
	try {
		const res = await api.get('/expenses/total', { params });
		return res.data;
	} catch (error) {
		handleError(error);
	}
}

