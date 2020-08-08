import { CART_UPDATE, CART_FAIL, LOAD_CART } from '../actions/types';

const initialState = {
	contents: [],
	totalQuantity: 0,
	subTotal: 0,
	totalPrice: 0,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CART_UPDATE:
		case LOAD_CART:
			return payload;
		case CART_FAIL:
			return { contents: [], totalQuantity: 0, subTotal: 0, totalPrice: 0 };
		default:
			return state;
	}
}
