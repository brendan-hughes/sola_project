import { LOAD_SHOP, SHOP_FAIL } from '../actions/types';

const initialState = {
	productList: [],
	currentCategory: '',
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOAD_SHOP:
			return payload;
		case SHOP_FAIL:
		default:
			return state;
	}
}
