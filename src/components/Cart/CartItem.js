import React, { Component } from 'react';
import './cart.css';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
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
	constructor(props) {
		super(props);
		this.state = {
			imgURL: '',
			imgLoading: true,
		};
	}
	componentDidMount() {
		if (!firebase.apps.length) {
			const firebaseConfig = {
				apiKey: 'AIzaSyA_yN_Qvt0JCCAKFjwoSHoa1V8G4fIq8gM',
				authDomain: 'sola-b8331.firebaseapp.com',
				databaseURL: 'https://sola-b8331.firebaseio.com',
				projectId: 'sola-b8331',
				storageBucket: 'sola-b8331.appspot.com',
				messagingSenderId: '304188953924',
				appId: '1:304188953924:web:0ac558f29a331c00f5f311',
				measurementId: 'G-SWHNR7V607',
			};
			firebase.initializeApp(firebaseConfig);
		}
		var storage = firebase.storage();

		try {
			storage
				.ref(
					`productImages/${this.props.productSku}/${this.props.productImage}`
				)
				.getDownloadURL()
				.then((url) => {
					this.setState({ img: url, imgLoading: false });
				});
		} catch (error) {
			console.log(error);
		}
	}
	render() {
		return (
			<div className="cartItemDiv">
				{this.state.imgLoading ? (
					<div className="loader"></div>
				) : (
					<img
						alt="productImage"
						className="cartItemImage"
						src={this.state.img}
					></img>
				)}

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
