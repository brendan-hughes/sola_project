import React, { useState } from 'react';
import {
	Elements,
	CardElement,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js';
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

const stripePromise = loadStripe(
	'pk_test_51HE0nBAShFn2PFDA4aOcHt1Lf843Vt8MXA5AkFmkfCB0kxBCCh1uHIm6IU3SnOZs5rIOIMroxXpLjp4UwkERezfn00QCAPsJXq'
);

const FormBody = (props) => {
	const [cartFormData, setCartFormData] = useState({
		nameOnCard: '',
		address: '',
		shippingAddress: '',
		sameAsAddress: false,
		successfulPayment: false,
	});

	const onChange = (e) => {
		if (e === 'check') {
			const current = cartFormData.sameAsAddress;
			if (current === false) {
				setCartFormData({
					...cartFormData,
					sameAsAddress: true,
				});
			} else {
				setCartFormData({
					...cartFormData,
					sameAsAddress: false,
				});
			}
		} else {
			setCartFormData({
				...cartFormData,
				[e.target.name]: e.target.value,
			});
		}
	};

	const stripe = useStripe();
	const elements = useElements();
	const handleSubmit = async (e) => {
		e.preventDefault();

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		});
		if (!error) {
			const { id } = paymentMethod;

			try {
				const { data } = await axios.post('/api/charge', {
					id,
					value: props.cartTotal,
					customer: {
						name: cartFormData.nameOnCard,
						address: cartFormData.address,
						shippingAddress: cartFormData.shippingAddress,
					},
					cartToken: localStorage.getItem('cartToken'),
				});
				console.log(data);
				if (data === 'Success') {
					setCartFormData({ ...cartFormData, successfulPayment: true });
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	if (cartFormData.successfulPayment === true) {
		return <Redirect to="/success" />;
	}

	return (
		<div className="cartPaymentDiv">
			<h2 className="paymentDivHeader">Shipping Details</h2>
			<form className="paymentDetailsForm" onSubmit={(e) => handleSubmit(e)}>
				<div className="paymentFormSection">
					<p className="paymentFormLabel">Name on Card</p>
					<input
						type="text"
						name="nameOnCard"
						onChange={(e) => onChange(e)}
						className="paymentDetailsInput paymentDetailsInputFull"
					></input>
				</div>
				<div className="paymentFormSection">
					<p className="paymentFormLabel">Address</p>
					<input
						type="text"
						name="address"
						onChange={(e) => onChange(e)}
						className="paymentDetailsInput paymentDetailsInputFull"
					></input>
				</div>
				{cartFormData.sameAsAddress === false ? (
					<div className="paymentFormSectionHorizontal">
						<div className="paymentFormSection ">
							<p className="paymentFormLabel">Shipping Address</p>
							<input
								type="text"
								name="shippingAddress"
								onChange={(e) => onChange(e)}
								className="paymentDetailsInput paymentDetailsInputAlmostFull"
							></input>
						</div>
						<div className="paymentFormSectionHorizontalItem">
							<p className="paymentFormLabel">Same As Address?</p>
							<div
								onClick={() => onChange('check')}
								className="paymentDetailsCheckbox"
							>
								No
							</div>
						</div>
					</div>
				) : (
					<div className="paymentFormSectionHorizontal">
						<div className="paymentFormSection deactivatedInput" readonly>
							<p className="paymentFormLabel">Shipping Address</p>
							<div className="paymentDetailsInput paymentDetailsInputAlmostFull shippingAddressReplacementDiv"></div>
						</div>
						<div className="paymentFormSectionHorizontalItem">
							<p className="paymentFormLabel">Same As Address?</p>
							<div
								onClick={() => onChange('check')}
								className="paymentDetailsCheckbox 
								paymentDetailsCheckboxActive"
							>
								Yes
							</div>
						</div>
					</div>
				)}

				<div className="paymentFormSection">
					<p className="paymentFormLabel">Card Number</p>
					<CardElement
						className="paymentDetailsInput paymentDetailsInputFull cardPaymentElement"
						options={{
							style: {
								base: {
									color: 'white',
									'::placeholder': {
										color: 'white',
									},
								},
								invalid: {
									color: '#9e2146',
								},
							},
						}}
					/>
				</div>

				<button className="checkoutButton" type="submit" disabled={!stripe}>
					Checkout
				</button>
			</form>
		</div>
	);
};

const CheckoutForm = (props) => {
	return (
		<Elements stripe={stripePromise}>
			<FormBody
				cartContents={props.cartContents}
				cartQuantity={props.cartQuantity}
				cartSubtotal={props.cartSubtotal}
				cartTotal={props.cartTotal}
			/>
		</Elements>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	cartContents: state.cart.contents,
	cartQuantity: state.cart.totalQuantity,
	cartSubtotal: state.cart.subTotal,
	cartTotal: state.cart.totalPrice,
});

export default connect(mapStateToProps)(CheckoutForm);
