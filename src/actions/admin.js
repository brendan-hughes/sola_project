import {
	CHECK_ADMIN,
	LOAD_ORDERS,
	LOAD_INVENTORY,
	EDIT_ORDER,
	EDIT_PRODUCT,
	ADD_PRODUCT,
	REMOVE_PRODUCT,
	ADMIN_LOGOUT,
} from './types';
import axios from 'axios';

export const checkAdmin = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/admin');
		dispatch({
			type: CHECK_ADMIN,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const adminLogOut = () => async (dispatch) => {
	try {
		dispatch({
			type: ADMIN_LOGOUT,
		});
	} catch (error) {
		console.log(error);
	}
};

export const loadOrders = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/admin/orders');
		const data = res.data.reverse();
		dispatch({
			type: LOAD_ORDERS,
			payload: data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const editOrders = (orderID, status, notes) => async (dispatch) => {
	try {
		let statusString = '';
		let noteString = '';
		if (status === '') {
			statusString = 'nochange';
		} else {
			statusString = status;
		}
		if (notes === '') {
			noteString = 'nochange';
		} else {
			noteString = notes;
		}
		const res = await axios.post('/api/admin/orders', {
			note: noteString,
			status: statusString,
			orderID,
		});
		const data = res.data.reverse();
		dispatch({
			type: LOAD_ORDERS,
			payload: data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const removeOrder = (orderID) => async (dispatch) => {
	try {
		const res = await axios.post('/api/admin/orders/remove', {
			orderID,
		});
		const data = res.data.reverse();
		dispatch({
			type: LOAD_ORDERS,
			payload: data,
		});
	} catch (error) {
		console.log(error);
	}
};
