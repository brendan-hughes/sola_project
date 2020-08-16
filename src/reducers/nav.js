import {
	LOAD_NAV,
	NAV_FAIL,
	LOAD_SEARCH,
	REMOVE_SEARCH,
} from '../actions/types';

const initialState = {
	categoriesList: [],
	brandList: [],
	searchResults: [],
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOAD_NAV:
			return {
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
		case NAV_FAIL:
		default:
			return state;
	}
}
