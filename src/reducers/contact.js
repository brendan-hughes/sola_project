import {
	CONTACT_SUBMIT,
	CONTACT_FAIL,
	REFRESH_MESSAGE_PANEL,
	NEWSLETTER_SUBMIT,
} from '../actions/types';

const initialState = {
	success: '',
	error: '',
	newsletterSubmitted: false,
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
		case NEWSLETTER_SUBMIT:
			return {
				...state,
				newsletterSubmitted: true,
			};
		default:
			return state;
	}
}
