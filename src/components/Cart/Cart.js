import React, { Fragment, Component } from 'react';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { connect } from 'react-redux';
import { loadCart } from '../../actions/cart';
import './cart.css';
import { loadStripe } from 'stripe';

class Cart extends Component {
	render() {
		return (
			<Fragment>
				<section className="cartSection">
					<div className="cartItemsDiv">
						<h2 className="cartHeader">Shopping Cart</h2>
						{this.props.cartContents.length === 0 ? (
							<div className="noItemsDiv">
								<p className="noItemsText">No items in cart.</p>
							</div>
						) : (
							this.props.cartContents.map((cartItem) => (
								<CartItem
									productTitle={cartItem.product.name}
									productDescription={cartItem.product.description}
									productSku={cartItem.product.sku}
									productCategory={cartItem.product.category}
									productPrice={cartItem.product.price}
									productBrand={cartItem.product.brand}
									productQuantity={cartItem.quantity}
								/>
							))
						)}
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
					<CheckoutForm />
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
