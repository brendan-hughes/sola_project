import axios from 'axios';
import { CART_UPDATE, CART_FAIL, LOAD_CART, ORDER_SUCCESS } from './types';

export const addToCart = (sku, cart, quantity, image) => async (dispatch) => {
	console.log('Adding to cart');
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
		const payload = res.data;
		dispatch({
			type: CART_UPDATE,
			payload: payload,
		});
	} catch (error) {
		console.log('Error:', error);
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
		const payload = res.data;
		dispatch({
			type: LOAD_CART,
			payload: payload,
		});
	} catch (error) {
		dispatch({
			type: CART_FAIL,
		});
	}
};

export const reduceQuantity = (sku, cart) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post(`/api/cart/reduce/${sku}/${cart}`, config);
		const payload = res.data;
		dispatch({
			type: CART_UPDATE,
			payload: payload,
		});
	} catch (error) {
		console.log('Error:', error);
		dispatch({
			type: CART_FAIL,
		});
	}
};

export const increaseQuantity = (sku, cart) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post(`/api/cart/increase/${sku}/${cart}`, config);
		const payload = res.data;
		dispatch({
			type: CART_UPDATE,
			payload: payload,
		});
	} catch (error) {
		console.log('Error:', error);
		dispatch({
			type: CART_FAIL,
		});
	}
};

export const removeFromCart = (sku, cart) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	try {
		const res = await axios.post(`/api/cart/remove/${sku}/${cart}`, config);
		const payload = res.data;
		dispatch({
			type: CART_UPDATE,
			payload: payload,
		});
	} catch (error) {
		console.log('Error:', error);
		dispatch({
			type: CART_FAIL,
		});
	}
};

export const orderSuccess = () => (dispatch) => {
	dispatch({
		type: ORDER_SUCCESS,
		payload: {
			contents: [],
			totalQuantity: 0,
			subTotal: 0,
			totalPrice: 0,
		},
	});
};
