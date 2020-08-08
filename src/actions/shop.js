import axios from 'axios';
import { LOAD_SHOP, SHOP_FAIL } from './types';

export const loadShop = (shopRoute) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const category = shopRoute.split('/')[2];
		const brand = shopRoute.split('/')[3];
		let currentCategory = '';
		if (category === 'any' && brand !== 'any') {
			currentCategory = brand.replace('_', ' ');
		} else if (brand === 'any' && category !== 'any') {
			currentCategory = category;
		} else if (brand === 'any' && category === 'any') {
			currentCategory = 'All Products';
		}
		try {
			const res = await axios.get(`/api/shop/${category}/${brand}`, config);
			dispatch({
				type: LOAD_SHOP,
				payload: { productList: res.data, currentCategory },
			});
		} catch (error) {
			console.log(error);
		}
	} catch (error) {
		dispatch({
			type: SHOP_FAIL,
		});
	}
};
