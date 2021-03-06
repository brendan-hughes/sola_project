import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './signin.css';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../Layout/Alert';

const SignIn = (props) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password_confirm: '',
	});

	const { email, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		try {
			props.login({ email, password });
		} catch (error) {
			console.log(error);
		}
	};

	//Redirect if logged in
	if (props.isAuthenticated) {
		return <Redirect to="/" />;
	}

	return (
		<Fragment>
			<section className="signInSection">
				<div className="signInContainer">
					<div className="signInCard">
						<form className="signInForm" onSubmit={(e) => onSubmit(e)}>
							<div className="signInFormSection">
								<p className="signInFormLabel">Email</p>
								<input
									type="text"
									name="email"
									onChange={(e) => onChange(e)}
									value={email}
									required
									className="signInInput signInInputFull"
								></input>
							</div>
							<div className="signInFormSection">
								<p className="signInFormLabel">Password</p>
								<input
									type="password"
									name="password"
									required
									onChange={(e) => onChange(e)}
									value={password}
									className="signInInput signInInputFull"
								></input>
							</div>
							<button className="signInButton">SIGN IN</button>
						</form>
					</div>
					<p className="newUserText">
						Don't have an account?
						<Link to="/signin/register" className="registerLink">
							Click to Register
						</Link>
					</p>
					<Alert />
				</div>
			</section>
		</Fragment>
	);
};
SignIn.propTypes = {
	setAlert: PropTypes.func.isRequired,
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login })(SignIn);
