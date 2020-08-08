import { LOAD_PRODUCT, PRODUCT_FAIL } from '../actions/types';

const initialState = {
	productDetails: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOAD_PRODUCT:
			return { productDetails: payload[0] };
		case PRODUCT_FAIL:
		default:
			return state;
	}
}
