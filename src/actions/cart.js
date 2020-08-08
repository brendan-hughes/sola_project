import axios from 'axios';
import { CART_UPDATE, CART_FAIL, LOAD_CART } from './types';

export const addToCart = (sku, cart, quantity) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post(
			`/api/cart/add/${sku}/${cart}/${quantity}`,
			config
		);
		console.log(res);
		dispatch({
			type: CART_UPDATE,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CART_FAIL,
		});
	}
};

export const loadCart = (cart) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.get(`/api/cart/load/${cart}`, config);
		dispatch({
			type: LOAD_CART,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CART_FAIL,
		});
	}
};
