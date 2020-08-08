import React, { Fragment, Component } from 'react';
import CartItem from './CartItem';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { connect } from 'react-redux';
import { loadCart } from '../../actions/cart';
import './cart.css';

class Cart extends Component {
	render() {
		return (
			<Fragment>
				<section className="cartSection">
					<div className="cartItemsDiv">
						<h2 className="cartHeader">Shopping Cart</h2>
						{this.props.cartContents.map((cartItem) => (
							<CartItem
								productTitle={cartItem.product.name}
								productDescription={cartItem.product.description}
								productSku={cartItem.product.sku}
								productCategory={cartItem.product.category}
								productPrice={cartItem.product.price}
								productBrand={cartItem.product.brand}
								productQuantity={cartItem.quantity}
							/>
						))}
						<div className="cartDetailsFooter">
							<div
								className="cartViewBackButtonDiv"
								onClick={() => {
									window.location = '/shop/Panels/any';
								}}
							>
								<IconContext.Provider value={{ size: '20px' }}>
									<IoMdArrowRoundBack className="productViewBackButton" />
								</IconContext.Provider>
								<p className="productViewBackButtonText">Continue Shopping </p>
							</div>
							<div className="cartSubtotalDiv">
								<p className="cartSubtotalHeader">SUBTOTAL: </p>
								<p className="cartSubtotalAmount">${this.props.cartSubtotal}</p>
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

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	cartContents: state.cart.contents,
	cartQuantity: state.cart.totalQuantity,
	cartSubtotal: state.cart.subTotal,
	cartTotal: state.cart.totalPrice,
});

export default connect(mapStateToProps, { loadCart })(Cart);
