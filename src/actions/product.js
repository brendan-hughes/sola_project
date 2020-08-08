import axios from 'axios';
import { LOAD_PRODUCT, PRODUCT_FAIL } from './types';

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
