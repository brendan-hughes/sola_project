import { LOAD_NAV, NAV_FAIL } from '../actions/types';

const initialState = {
	categoriesList: [],
	brandList: [],
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOAD_NAV:
			return {
				categoriesList: payload.categoriesList,
				brandList: payload.brandList,
			};
		case NAV_FAIL:
		default:
			return state;
	}
}
