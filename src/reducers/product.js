import {
	LOAD_PRODUCT,
	PRODUCT_FAIL,
	LOAD_RECOMMENDATIONS,
} from '../actions/types';

const initialState = {
	productDetails: {},
	recommendations: [],
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOAD_PRODUCT:
			return { productDetails: payload[0] };
		case LOAD_RECOMMENDATIONS:
			return {
				...state,
				recommendations: payload,
			};
		case PRODUCT_FAIL:
		default:
			return state;
	}
}
