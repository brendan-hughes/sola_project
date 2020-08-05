import React, { Fragment, Component } from 'react';
import './cart.css';

class CartItem extends Component {
	render() {
		return (
			<div className="cartItemDiv">
				<img
					className="cartItemImage"
					src={require('../../assets/solar_panel3.png')}
				></img>
				<div className="cartItemDetailsDiv">
					<p className="cartItemTitle">Product Title</p>
					<p className="cartItemSku">SKU: #21432415</p>
				</div>
				<div className="productViewQuantityDiv cartQuantityDiv">
					<div className="productViewQuantityButton">
						<div className="productViewQuantityButtonNegative">-</div>
						<p className="productViewQuantityButtonValue">1</p>
						<div className="productViewQuantityButtonPositive">+</div>
					</div>
				</div>
				<div className="cartItemValueDiv">
					<p className="cartItemValue">$100</p>
				</div>
				<div className="cartItemRemoveDiv">
					<p className="cartItemRemoveX">X</p>
					<p className="cartItemRemoveText">REMOVE</p>
				</div>
			</div>
		);
	}
}

export default CartItem;
