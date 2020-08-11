import {
	CHECK_ADMIN,
	LOAD_ORDERS,
	LOAD_INVENTORY,
	EDIT_ORDER,
	EDIT_PRODUCT,
	ADD_PRODUCT,
	REMOVE_PRODUCT,
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

export const loadOrders = () => async (dispatch) => {
	try {
		console.log('Getting orders, in the loadOrders method');
		const res = await axios.get('/api/admin/orders');
		console.log('This is the response from the API', res);
	} catch (error) {
		console.log(error);
	}
};
