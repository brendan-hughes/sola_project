import React, { Component } from 'react';
import './cart.css';
import { connect } from 'react-redux';
import {
	reduceQuantity,
	increaseQuantity,
	removeFromCart,
} from '../../actions/cart';

const reduceQuant = (e, props, sku) => {
	if (props.productQuantity > 1) {
		props.reduceQuantity(sku, localStorage.getItem('cartToken'));
	}
};

const increaseQuant = (e, props, sku) => {
	props.increaseQuantity(sku, localStorage.getItem('cartToken'));
};

const removeCart = (e, props, sku) => {
	props.removeFromCart(sku, localStorage.getItem('cartToken'));
};

class CartItem extends Component {
	render() {
		return (
			<div className="cartItemDiv">
				<img
					alt="Product View"
					className="cartItemImage"
					src={require('../../assets/solar_panel3.png')}
				></img>
				<div className="cartItemDetailsDiv">
					<p className="cartItemTitle">{this.props.productTitle}</p>
					<p className="cartItemSku">SKU: #{this.props.productSku}</p>
				</div>
				<div className="productViewQuantityDiv cartQuantityDiv">
					<div className="productViewQuantityButton">
						<div
							className="productViewQuantityButtonNegative"
							onClick={(e) => reduceQuant(e, this.props, this.props.productSku)}
						>
							-
						</div>
						<p className="productViewQuantityButtonValue">
							{this.props.productQuantity}
						</p>
						<div
							className="productViewQuantityButtonPositive"
							onClick={(e) =>
								increaseQuant(e, this.props, this.props.productSku)
							}
						>
							+
						</div>
					</div>
				</div>
				<div className="cartItemValueDiv">
					<p className="cartItemValue">
						${this.props.productPrice * this.props.productQuantity}
					</p>
				</div>
				<div
					className="cartItemRemoveDiv"
					onClick={(e) => removeCart(e, this.props, this.props.productSku)}
				>
					<p className="cartItemRemoveX">X</p>
					<p className="cartItemRemoveText">REMOVE</p>
				</div>
			</div>
		);
	}
}

export default connect(null, {
	reduceQuantity,
	increaseQuantity,
	removeFromCart,
})(CartItem);
