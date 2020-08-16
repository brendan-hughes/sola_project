import axios from 'axios';
import { LOAD_NAV, NAV_FAIL, LOAD_SEARCH, REMOVE_SEARCH } from './types';

export const loadNav = () => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	try {
		const response = await axios.get('/api/nav/load', config);
		const payload = {
			categoriesList: response.data.categoriesList,
			brandList: response.data.brandList,
		};
		dispatch({
			type: LOAD_NAV,
			payload: payload,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: NAV_FAIL,
		});
	}
};

export const searchProducts = (query) => async (dispatch) => {
	try {
		const response = await axios.post('/api/nav/product', { query });
		const payload = {
			searchResults: response.data,
		};
		dispatch({
			type: LOAD_SEARCH,
			payload: payload,
		});
	} catch (error) {}
};

export const removeSearchProducts = () => async (dispatch) => {
	try {
		dispatch({
			type: REMOVE_SEARCH,
		});
	} catch (error) {}
};
