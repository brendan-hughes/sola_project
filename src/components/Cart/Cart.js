import React, { Fragment, Component } from 'react';
import CartItem from './CartItem';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IconContext } from 'react-icons';
import './cart.css';

class SignIn extends Component {
	render() {
		return (
			<Fragment>
				<section className="cartSection">
					<div className="cartItemsDiv">
						<h2 className="cartHeader">Shopping Cart</h2>
						<CartItem />
						<div className="cartDetailsFooter">
							<div className="cartViewBackButtonDiv">
								<IconContext.Provider value={{ size: '20px' }}>
									<IoMdArrowRoundBack className="productViewBackButton" />
								</IconContext.Provider>
								<p className="productViewBackButtonText">Continue Shopping </p>
							</div>
							<div className="cartSubtotalDiv">
								<p className="cartSubtotalHeader">SUBTOTAL: </p>
								<p className="cartSubtotalAmount">$100</p>
							</div>
						</div>
					</div>
					<div className="cartPaymentDiv">
						<h2 className="paymentDivHeader">Shipping Details</h2>
						<form className="paymentDetailsForm">
							<div className="paymentFormSection">
								<p className="paymentFormLabel">Name on Card</p>
								<input
									type="text"
									className="paymentDetailsInput paymentDetailsInputFull"
								></input>
							</div>
							<div className="paymentFormSection">
								<p className="paymentFormLabel">Address</p>
								<input
									type="text"
									className="paymentDetailsInput paymentDetailsInputFull"
								></input>
							</div>
							<div className="paymentFormSectionHorizontal">
								<div className="paymentFormSection ">
									<p className="paymentFormLabel">Shipping Address</p>
									<input
										type="text"
										className="paymentDetailsInput paymentDetailsInputAlmostFull"
									></input>
								</div>
								<div className="paymentFormSectionHorizontalItem">
									<p className="paymentFormLabel">Same As Address?</p>
									<input
										type="checkbox"
										className="paymentDetailsCheckbox"
									></input>
								</div>
							</div>

							<div className="paymentFormSection">
								<p className="paymentFormLabel">Card Number</p>
								<input
									type="text"
									className="paymentDetailsInput paymentDetailsInputFull"
								></input>
							</div>

							<div className="paymentFormSectionHorizontal">
								<div className="paymentFormSectionHorizontalItem">
									<p className="paymentFormLabel">Expiration Date</p>
									<input
										type="text"
										className="paymentDetailsInput paymentDetailsInputSmall"
									></input>
								</div>
								<div className="paymentFormSectionHorizontalItem">
									<p className="paymentFormLabel">CVV</p>
									<input
										type="text"
										className="paymentDetailsInput paymentDetailsInputSmall"
									></input>
								</div>
							</div>
							<button className="checkoutButton">CHECKOUT</button>
						</form>
					</div>
				</section>
			</Fragment>
		);
	}
}

export default SignIn;
