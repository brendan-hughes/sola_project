import {
	CONTACT_SUBMIT,
	CONTACT_FAIL,
	REFRESH_MESSAGE_PANEL,
} from '../actions/types';

const initialState = {
	success: '',
	error: '',
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case CONTACT_SUBMIT:
			return payload;
		case REFRESH_MESSAGE_PANEL:
			return {
				success: '',
				error: '',
			};
		case CONTACT_FAIL:
			return {
				success: '',
				error: 'There has been an error. Please try again later.',
			};
		default:
			return state;
	}
}
