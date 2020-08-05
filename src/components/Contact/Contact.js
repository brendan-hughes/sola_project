import React, { Fragment } from 'react';
import './contact.css';

function Contact() {
	return (
		<Fragment>
			<section className="contactSection">
				<h1 className="contactHeader">Get In Touch</h1>
				<form className="contactForm">
					<input
						className="subjectInput"
						placeholder="Subject"
						type="text"
					></input>
					<input className="emailInput" placeholder="Email" type="text"></input>
					<input className="nameInput" placeholder="Name" type="text"></input>
					<textarea
						className="messageInput"
						placeholder="Message"
						name="messageInput"
						cols="40"
						rows="7"
					></textarea>
					<input type="submit"></input>
				</form>
			</section>
		</Fragment>
	);
}

export default Contact;
