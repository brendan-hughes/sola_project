import {
	LOAD_NAV,
	NAV_FAIL,
	LOAD_SEARCH,
	REMOVE_SEARCH,
	VIEWED_MODAL,
	VIEWED_BUBBLE,
} from '../actions/types';

const initialState = {
	categoriesList: [],
	brandList: [],
	searchResults: [],
	viewedModal: false,
	viewedBubble: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOAD_NAV:
			return {
				...state,
				categoriesList: payload.categoriesList,
				brandList: payload.brandList,
			};
		case LOAD_SEARCH:
			return {
				...state,
				searchResults: payload.searchResults.returnList,
			};
		case REMOVE_SEARCH:
			return {
				...state,
				searchResults: [],
			};
		case VIEWED_MODAL:
			return {
				...state,
				viewedModal: true,
			};
		case VIEWED_BUBBLE:
			return {
				...state,
				viewedBubble: true,
			};
		case NAV_FAIL:
		default:
			return state;
	}
}
