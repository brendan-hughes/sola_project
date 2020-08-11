import { CHECK_ADMIN } from '../actions/types';

const initialState = {
	isAdmin: false,
	orders: [],
	inventory: [],
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CHECK_ADMIN:
			return {
				...state,
				isAdmin: payload,
			};
		default:
			return state;
	}
}
