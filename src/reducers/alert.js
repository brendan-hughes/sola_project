import {
	SET_ALERT,
	REMOVE_ALERT,
	REMOVE_PREVIOUS_ALERTS,
} from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case SET_ALERT:
			return [...state, payload];
		case REMOVE_ALERT:
			return state.filter((alert) => alert.id !== payload);
		case REMOVE_PREVIOUS_ALERTS:
			return [];
		default:
			return state;
	}
}
