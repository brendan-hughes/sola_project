import React, { Fragment } from 'react';
import './footer.css';
import sgMail from '@sendgrid/mail';

function Footer() {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	return (
		<Fragment>
			<footer>
				<div className="upperFooter">
					<div className="leftUpperFooter">
						<p className="footerHeader">Quick Nav</p>
						<p className="footerLink">Shop</p>
						<p className="footerLink">Contact</p>
						<p className="footerLink">Find A Store</p>
					</div>
					<div className="middleUpperFooter">
						<p className="footerHeader">Categories</p>
						<p className="footerLink">Panels</p>
						<p className="footerLink">Batteries</p>
						<p className="footerLink">Lights</p>
					</div>
					<div className="rightUpperFooter">
						<p className="footerHeader">Newsletter</p>
						<div className="newsletterSignupContainer">
							<input
								className="newsletterInput"
								type="email"
								placeholder="Email Address"
							/>
							<button
								className="newsletterButton"
								onClick={(e) => {
									const msg = {
										to: e.target.value,
										from: 'brendanhughes.dev@gmai.com',
										subject: 'Sending with Twilio SendGrid is Fun',
										text: 'and easy to do anywhere, even with Node.js',
										html:
											'<strong>and easy to do anywhere, even with Node.js</strong>',
									};
									sgMail.send(msg);
								}}
							>
								Sign Up
							</button>
						</div>
					</div>
				</div>
				<div className="lowerFooter">
					Developed by{' '}
					<a
						className="devLink"
						href="https://github.com/brendan-hughes/brendan-hughes.github.io"
					>
						Brendan Hughes
					</a>{' '}
					(2020)
				</div>
			</footer>
		</Fragment>
	);
}

export default Footer;
