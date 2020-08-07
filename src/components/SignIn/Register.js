import React, { Fragment, useState } from 'react';
import './signin.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../Layout/Alert';

const Register = (props) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password_confirm: '',
	});

	const { name, email, password, password_confirm } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		console.log('Attempted to submit');
		if (password !== password_confirm) {
			props.setAlert('Passwords do not match.', 'passwordError');
		} else {
			console.log('Registering');
			try {
				props.register({ name, email, password });
			} catch (error) {
				console.log(error);
			}
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
					<div className="registerCard">
						<form className="signInForm" onSubmit={(e) => onSubmit(e)}>
							<div className="signInFormSection">
								<p className="signInFormLabel">Name</p>
								<input
									type="text"
									name="name"
									required
									className="signInInput signInInputFull"
									value={name}
									onChange={(e) => onChange(e)}
								></input>
							</div>
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
							<div className="signInFormSection">
								<p className="signInFormLabel">Confirm Password</p>
								<input
									type="password"
									name="password_confirm"
									required
									onChange={(e) => onChange(e)}
									value={password_confirm}
									className="signInInput signInInputFull"
								></input>
							</div>
							<button className="signInButton">REGISTER</button>
						</form>
					</div>
					<p className="returningUserText">
						Already have an account?{' '}
						<Link to="/signin" className="registerLink">
							{' '}
							Click to Sign In
						</Link>
					</p>
					<Alert />
				</div>
			</section>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
