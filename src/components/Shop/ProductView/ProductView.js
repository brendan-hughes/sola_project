import React, { Fragment, Component } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaStore } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IconContext } from 'react-icons';
import Sidebar from '../Sidebar/Sidebar';
import navFunctionality from '../../../scripts/navFunctionality';
import './productview.css';
import { connect } from 'react-redux';
import { addToCart } from '../../../actions/cart';
import { loadProduct } from '../../../actions/product';
import { v4 as uuid } from 'uuid';
import TagManager from 'react-gtm-module';
import firebase from 'firebase/app';
import Axios from 'axios';

const productAddToCart = (e, props, quantity) => {
	if (!localStorage.getItem('cartToken')) {
		const cartToken = uuid();
		localStorage.setItem('cartToken', cartToken);
	}
	e.preventDefault();
	props.addToCart(
		props.productSku,
		localStorage.getItem('cartToken'),
		quantity
	);
};

class ProductView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quantityMeasure: 1,
			imgURL: '',
			imgLoading: true,
			sku: this.props.productSku,
		};
	}

	componentDidMount() {
		navFunctionality();

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
			const urlArray = window.location.href.split('/');
			const sku = urlArray[urlArray.length - 1];
			//Get name of image from mongoDB
			storage
				.ref(`productImages/${sku}/solar_panel3.png`)
				.getDownloadURL()
				.then((url) => {
					console.log('success');
					console.log(url);
					this.setState({ img: url, imgLoading: false });
				});
		} catch (error) {
			console.log(error);
		}

		this.props.loadProduct(window.location.pathname).then(() => {
			TagManager.dataLayer({
				dataLayer: {
					page: 'product',
					productName: this.props.productTitle,
					productCategory: this.props.productCategory,
					shopCategory: this.props.productCategory,
					productBrand: this.props.productBrand,
				},
			});
		});
	}

	render() {
		return (
			<Fragment>
				<Sidebar />
				<section className="productViewSection">
					<div
						className="productViewBackButtonDiv"
						onClick={() => {
							window.history.back();
						}}
					>
						<IconContext.Provider value={{ size: '20px' }}>
							<IoMdArrowRoundBack className="productViewBackButton" />
						</IconContext.Provider>
						<p className="productViewBackButtonText">Back </p>
					</div>

					<div className="productViewImageDiv">
						<div className="productViewMainImageDiv">
							{this.state.imgLoading ? (
								<div>?</div>
							) : (
								<img
									alt="Product View"
									className="productViewMainImage"
									src={this.state.img}
								></img>
							)}
						</div>
						<div className="productViewSubImageCarousel">
							<img className="productViewSubImage"></img>
							<img className="productViewSubImage"></img>
							<img className="productViewSubImage"></img>
							<img className="productViewSubImage"></img>
						</div>
					</div>
					<div className="productViewDetailsDiv">
						<div className="productViewCategoryTypeDiv">
							<p className="productViewCategoryTypeText">
								{this.props.productCategory}
							</p>
						</div>
						<h1 className="productViewHeader">{this.props.productTitle}</h1>
						<p className="skuHeader">SKU: {this.props.productSku}</p>
						<p className="productViewDescription">
							{this.props.productDescription}
						</p>
						<div className="productViewQuantAndValueDiv">
							<div className="productViewQuantityDiv">
								<p className="productViewQuantityHeader">QUANTITY</p>
								<div className="productViewQuantityButton">
									<div
										className="productViewQuantityButtonNegative"
										onClick={() => {
											if (this.state.quantityMeasure > 1)
												this.setState({
													...this.state,
													quantityMeasure: this.state.quantityMeasure - 1,
												});
										}}
									>
										-
									</div>
									<p className="productViewQuantityButtonValue">
										{this.state.quantityMeasure}
									</p>
									<div
										className="productViewQuantityButtonPositive"
										onClick={() =>
											this.setState({
												...this.state,
												quantityMeasure: this.state.quantityMeasure + 1,
											})
										}
									>
										+
									</div>
								</div>
							</div>
							<p className="productViewPriceValue">
								${this.props.productPrice}
							</p>
						</div>
						<button
							className="productViewAddToCart"
							onClick={(e) =>
								productAddToCart(e, this.props, this.state.quantityMeasure)
							}
						>
							<p className="productViewAddToCartText"></p>Add To Cart{' '}
							<IconContext.Provider value={{ size: '20px' }}>
								<AiOutlineShoppingCart className="productViewAddToCartIcon" />
							</IconContext.Provider>
						</button>
						<button className="productViewFindInStore">
							<p className="productViewFindInStoreText"></p>Find In Store{' '}
							<IconContext.Provider value={{ size: '20px' }}>
								<FaStore className="productViewFindInStoreIcon" />
							</IconContext.Provider>
						</button>
					</div>
				</section>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	productTitle: state.product.productDetails.name,
	productSku: state.product.productDetails.sku,
	productCategory: state.product.productDetails.category,
	productBrand: state.product.productDetails.brand,
	productPrice: state.product.productDetails.price,
	productDescription: state.product.productDetails.description,
});

export default connect(mapStateToProps, { addToCart, loadProduct })(
	ProductView
);
