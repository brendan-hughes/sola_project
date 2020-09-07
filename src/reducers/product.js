import {
	LOAD_PRODUCT,
	PRODUCT_FAIL,
	LOAD_RECOMMENDATIONS,
	CLEAR_RECOMMENDATIONS,
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
		case CLEAR_RECOMMENDATIONS:
			return {
				...state,
				recommendations: [],
			};
		case PRODUCT_FAIL:
		default:
			return state;
	}
}
