import React, { Fragment, Component } from 'react';
import './signin.css';

class SignIn extends Component {
	render() {
		return (
			<Fragment>
				<section className="signInSection">
					<div className="signInCard">
						<form className="signInForm">
							<div className="signInFormSection">
								<p className="signInFormLabel">Name</p>
								<input
									type="text"
									className="signInInput signInInputFull"
								></input>
							</div>
							<div className="signInFormSection">
								<p className="signInFormLabel">Email</p>
								<input
									type="text"
									className="signInInput signInInputFull"
								></input>
							</div>
							<div className="signInFormSection">
								<p className="signInFormLabel">Password</p>
								<input
									type="text"
									className="signInInput signInInputFull"
								></input>
							</div>
							<button className="signInButton">REGISTER</button>
						</form>
					</div>
				</section>
			</Fragment>
		);
	}
}

export default SignIn;
