import axios from 'axios';
import { LOAD_PRODUCT, PRODUCT_FAIL, LOAD_RECOMMENDATIONS } from './types';

export const loadProduct = (path) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const sku = path.split('/')[2];
	try {
		const res = await axios.get(`/api/product/load/${sku}`, config);

		const payload = res.data;
		dispatch({
			type: LOAD_PRODUCT,
			payload: payload,
		});
	} catch (error) {
		dispatch({
			type: PRODUCT_FAIL,
		});
	}
};

//Start Session
export const startSession = (session, productSku) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post(
			`/api/product/session/new/${session}/${productSku}`,
			config
		);
		//Get current session details
		const res2 = await axios.get(`/api/product/session/${session}`, config);

		//Pass session products to get recommendations
		const sessionProducts = res2.data;
		const res3 = await axios.get(
			`/api/product/recommendations/${session}/${productSku}`,
			config
		);
		const payload = res3.data;

		dispatch({
			type: LOAD_RECOMMENDATIONS,
			payload: payload.recommendations,
		});
		console.log(res);
	} catch (error) {
		console.log(error);
	}
};

export const updateSession = (session, productSku) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const res = await axios.post(
			`/api/product/session/update/${session}/${productSku}`,
			config
		);
		//Get current session details
		const res2 = await axios.get(`/api/product/session/${session}`, config);

		//Pass session products to get recommendations
		const sessionProducts = res2.data;
		const res3 = await axios.get(
			`/api/product/recommendations/${session}/${productSku}`,
			config
		);
		const payload = res3.data;

		dispatch({
			type: LOAD_RECOMMENDATIONS,
			payload: payload.recommendations,
		});
	} catch (error) {
		console.log(error);
	}
};
