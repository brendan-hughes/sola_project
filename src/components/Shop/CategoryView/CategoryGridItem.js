import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import './categoryview.css';
import firebase from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import { addToCart } from '../../../actions/cart';

const productAddToCart = (e, props) => {
	if (!localStorage.getItem('cartToken')) {
		const cartToken = uuid();
		localStorage.setItem('cartToken', cartToken);
	}
	e.preventDefault();
	props.addToCart(props.productSku, localStorage.getItem('cartToken'), 1);
};

class CategoryGridItem extends Component {
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
			<Fragment>
				<Link className="gridLink" to={`/product/${this.props.productSku}`}>
					<div className="categoryGridItem">
						<div className="upperGridItem">
							<h2 className="gridItemTitle">{this.props.productTitle}</h2>
							<p className="gridItemPrice">${this.props.productPrice}</p>
							{this.state.imgLoading ? (
								<div className="loader"></div>
							) : (
								<img
									alt="productImage"
									className="gridItemImage"
									src={this.state.img}
								></img>
							)}
						</div>
						<div className="lowerGridItem">
							<div className="detailsLine">
								<button className="gridViewDetailsButton">
									<p className="gridItemDetailHeader">Product Details</p>
								</button>

								<button
									className="gridAddToCartButton"
									onClick={(e) => productAddToCart(e, this.props)}
								>
									<p className="gridCartText">Add To Cart</p>
									<IconContext.Provider value={{ size: '20px' }}>
										<AiOutlineShoppingCart className="gridCartIcon" />
									</IconContext.Provider>
								</button>
							</div>

							<p className="gridItemDetailText">
								{this.props.productDescription}
							</p>
						</div>
					</div>
				</Link>
			</Fragment>
		);
	}
}

export default connect(null, { addToCart })(CategoryGridItem);
