import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { submitMessage, refreshMessagePanel } from '../../actions/contact';
import './contact.css';

function Contact(props) {
	const [contactFormData, setContactFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	const onChange = (e) => {
		setContactFormData({ ...contactFormData, [e.target.name]: e.target.value });
	};

	const { name, email, subject, message } = contactFormData;

	const onSubmit = async (e) => {
		e.preventDefault();
		const subjectInput = document.querySelector('.subjectInput');
		const nameInput = document.querySelector('.nameInput');
		const emailInput = document.querySelector('.emailInput');
		const messageInput = document.querySelector('.messageInput');
		if (subject === '') {
			subjectInput.classList.add('errorInput');
		} else {
			subjectInput.classList.remove('errorInput');
		}
		if (name === '') {
			nameInput.classList.add('errorInput');
		} else {
			nameInput.classList.remove('errorInput');
		}
		if (email === '') {
			emailInput.classList.add('errorInput');
		} else {
			emailInput.classList.remove('errorInput');
		}
		if (message === '') {
			messageInput.classList.add('errorInput');
		} else {
			messageInput.classList.remove('errorInput');
		}

		if (name !== '' && email !== '' && subject !== '' && message !== '') {
			messageInput.classList.remove('errorInput');
			emailInput.classList.remove('errorInput');
			nameInput.classList.remove('errorInput');
			subjectInput.classList.remove('errorInput');
			await props.submitMessage(name, email, subject, message);
			messageInput.value = '';
			emailInput.value = '';
			nameInput.value = '';
			subjectInput.value = '';
			setTimeout(() => {
				props.refreshMessagePanel();
			}, 5000);
		} else {
			console.log('Missing info');
		}
	};

	return (
		<Fragment>
			<section className="contactSection">
				<h1 className="contactHeader">Get In Touch</h1>
				<form className="contactForm">
					<input
						className="contactFormInput subjectInput"
						placeholder="Subject"
						name="subject"
						type="text"
						required
						onChange={(e) => onChange(e)}
					></input>
					<input
						className="contactFormInput emailInput"
						name="email"
						required
						placeholder="Email"
						onChange={(e) => onChange(e)}
						type="text"
					></input>
					<input
						className="contactFormInput nameInput"
						name="name"
						required
						placeholder="Name"
						onChange={(e) => onChange(e)}
						type="text"
					></input>
					<textarea
						className="contactFormInput messageInput"
						placeholder="Message"
						required
						onChange={(e) => onChange(e)}
						name="message"
						cols="40"
						rows="7"
					></textarea>
					<input
						className="contactSubmitButton"
						type="submit"
						onClick={(e) => onSubmit(e)}
					></input>
				</form>
				{props.success !== '' ? (
					<div className="contactSuccessBubble">{props.success}</div>
				) : null}
			</section>
		</Fragment>
	);
}

const mapStateToProps = (state) => ({
	success: state.contact.success,
	error: state.contact.error,
});

export default connect(mapStateToProps, { submitMessage, refreshMessagePanel })(
	Contact
);
