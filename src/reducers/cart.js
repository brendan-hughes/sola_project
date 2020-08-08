import { CART_UPDATE, CART_FAIL, LOAD_CART } from '../actions/types';

const initialState = {
	cartContents: [],
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CART_UPDATE:
			return {
				...payload,
			};
		case CART_FAIL:
		case LOAD_CART:
			return state;
		default:
			return state;
	}
}
