import axios from 'axios';
import { LOAD_NAV, NAV_FAIL } from './types';

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
