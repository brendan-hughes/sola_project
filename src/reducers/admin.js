import {
	CHECK_ADMIN,
	LOAD_ORDERS,
	EDIT_ORDER,
	ADMIN_LOGOUT,
} from '../actions/types';

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
		case LOAD_ORDERS:
		case EDIT_ORDER:
			return {
				...state,
				orders: payload,
			};
		case ADMIN_LOGOUT:
			return {
				isAdmin: false,
				orders: [],
				inventory: [],
			};
		default:
			return state;
	}
}
