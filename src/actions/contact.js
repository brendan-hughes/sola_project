import axios from 'axios';
import {
	CONTACT_SUBMIT,
	CONTACT_FAIL,
	REFRESH_MESSAGE_PANEL,
	NEWSLETTER_SUBMIT,
} from './types';

export const submitMessage = (subject, email, name, message) => async (
	dispatch
) => {
	console.log('SUBMITTING!');
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		console.log('Sending message');
		const body = JSON.stringify({ subject, email, name, message });
		const response = await axios.post('/api/contact', body, config);
		if (response.data === 'Success') {
			dispatch({
				type: CONTACT_SUBMIT,
				payload: {
					success:
						"Message sent! We'll get back in touch as soon as possible. Thanks!",
				},
			});
		} else if (response.data === 'Error') {
			dispatch({
				type: CONTACT_FAIL,
			});
		}
	} catch (error) {
		dispatch({
			type: CONTACT_FAIL,
		});
	}
};

export const refreshMessagePanel = () => (dispatch) => {
	dispatch({
		type: REFRESH_MESSAGE_PANEL,
	});
};

export const sendEmail = (email) => async (dispatch) => {
	const body = JSON.stringify({ email });
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const response = await axios.post('/api/contact/newsletter', body, config);
	dispatch({
		type: NEWSLETTER_SUBMIT,
	});
};
