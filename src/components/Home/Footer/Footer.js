import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { sendEmail } from '../../../actions/contact';
import './footer.css';

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userEmail: '',
		};
	}
	render() {
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
							<p className="footerHeader">Top Categories</p>
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
									onChange={(e) => {
										this.setState({ userEmail: e.target.value });
									}}
								/>
								<button
									className="newsletterButton"
									onClick={() => {
										this.props.sendEmail(this.state.userEmail);
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
}

export default connect(null, { sendEmail })(Footer);
