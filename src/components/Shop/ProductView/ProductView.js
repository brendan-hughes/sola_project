import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaStore } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IconContext } from 'react-icons';
import Sidebar from '../Sidebar/Sidebar';
import navFunctionality from '../../../scripts/navFunctionality';
import './productview.css';
import { connect } from 'react-redux';
import { addToCart } from '../../../actions/cart';
import {
	loadProduct,
	startSession,
	updateSession,
} from '../../../actions/product';
import { v4 as uuid } from 'uuid';
import TagManager from 'react-gtm-module';
import firebase from 'firebase/app';

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
			recommendations: [],
			recommendationsLoading: true,
			recommendationImage1: '',
			recommendationImage2: '',
			recommendationImage3: '',
			sku: '',
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

		this.props.loadProduct(window.location.pathname).then(() => {
			this.setState({ sku: this.props.productSku });
			try {
				const urlArray = window.location.href.split('/');
				const sku = urlArray[urlArray.length - 1];
				const productImage = this.props.productImages[0];
				storage
					.ref(`productImages/${sku}/${productImage}`)
					.getDownloadURL()
					.then((url) => {
						this.setState({ img: url, imgLoading: false });
					});
				if (!sessionStorage.getItem('session')) {
					const sessionID = uuid();
					sessionStorage.setItem('session', sessionID);
					//Create new session
					this.props.startSession(sessionID, this.props.productSku).then(() => {
						let recoNumber = 1;
						this.props.recommendations.forEach((recommendation) => {
							storage
								.ref(
									`productImages/${recommendation.sku}/${recommendation.images[0]}`
								)
								.getDownloadURL()
								.then((url) => {
									if (recoNumber === 1) {
										this.setState({ recommendationImage1: url });
									}
									if (recoNumber === 2) {
										this.setState({ recommendationImage2: url });
									}
									if (recoNumber === 3) {
										this.setState({ recommendationImage3: url });
									}
									recoNumber = recoNumber + 1;
								});
						});

						this.setState({ recommendationsLoading: false });
					});
				} else {
					const sessionID = sessionStorage.getItem('session');
					//Update session
					this.props
						.updateSession(sessionID, this.props.productSku)
						.then(() => {
							let recoNumber = 1;
							this.props.recommendations.forEach((recommendation) => {
								storage
									.ref(
										`productImages/${recommendation.sku}/${recommendation.images[0]}`
									)
									.getDownloadURL()
									.then((url) => {
										if (recoNumber === 1) {
											this.setState({ recommendationImage1: url });
										}
										if (recoNumber === 2) {
											this.setState({ recommendationImage2: url });
										}
										if (recoNumber === 3) {
											this.setState({ recommendationImage3: url });
										}
										recoNumber = recoNumber + 1;
									});
							});

							this.setState({ recommendationsLoading: false });
						});
				}
			} catch (error) {
				console.log(error);
			}

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
							window.location.pathname = '/shop/Panels/any';
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
								<div className="productImageLoader">
									<div className="loader"></div>
								</div>
							) : (
								<img
									alt="Product View"
									className="productViewMainImage"
									src={this.state.img}
								></img>
							)}
						</div>

						{this.state.recommendationsLoading ? (
							<div className="recommenderContainer">
								<h2 className="recommenderHeader">Customers Also Viewed:</h2>
								<div className="productViewSubImageCarousel">
									<div className="recommendationItemContainer">
										<div className="recommendationItemCard">
											<div className="recommendationImageContainer">
												<div className="loader"></div>
											</div>
										</div>
									</div>
									<div className="recommendationItemContainer">
										<div className="recommendationItemCard">
											<div className="recommendationImageContainer">
												<div className="loader"></div>
											</div>
										</div>
									</div>
									<div className="recommendationItemContainer">
										<div className="recommendationItemCard">
											<div className="recommendationImageContainer">
												<div className="loader"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div className="recommenderContainer">
								<h2 className="recommenderHeader">Customers Also Viewed:</h2>

								<div className="productViewSubImageCarousel">
									<button
										className="recommendationItemContainer"
										onClick={() => {
											window.location.pathname = `/product/${this.props.recommendations[0].sku}`;
											this.setState({
												sku: this.props.recommendations[0].sku,
											});
										}}
									>
										<div className="recommendationItemCard">
											<p className="recommendationTitle">
												{this.props.recommendations[0].name}
											</p>
											<div className="recommendationImageContainer">
												<img
													className="recommendationImage"
													src={this.state.recommendationImage1}
												></img>
											</div>
										</div>
									</button>

									<button
										className="recommendationItemContainer"
										onClick={() => {
											window.location.pathname = `/product/${this.props.recommendations[1].sku}`;
											this.setState({
												sku: this.props.recommendations[1].sku,
											});
										}}
									>
										<div className="recommendationItemCard">
											<p className="recommendationTitle">
												{this.props.recommendations[1].name}
											</p>
											<div className="recommendationImageContainer">
												<img
													className="recommendationImage"
													src={this.state.recommendationImage2}
												></img>
											</div>
										</div>
									</button>
									<button
										className="recommendationItemContainer"
										onClick={() => {
											window.location.pathname = `/product/${this.props.recommendations[2].sku}`;
											this.setState({
												sku: this.props.recommendations[2].sku,
											});
										}}
									>
										<div className="recommendationItemCard">
											<p className="recommendationTitle">
												{this.props.recommendations[2].name}
											</p>
											<div className="recommendationImageContainer">
												<img
													className="recommendationImage"
													src={this.state.recommendationImage3}
												></img>
											</div>
										</div>
									</button>
								</div>
							</div>
						)}
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
						<Link className="productViewFindInStore" to={`/findstore`}>
							<p className="productViewFindInStoreText"></p>Find In Store{' '}
							<IconContext.Provider value={{ size: '20px' }}>
								<FaStore className="productViewFindInStoreIcon" />
							</IconContext.Provider>
						</Link>
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
	productImages: state.product.productDetails.images,
	recommendations: state.product.recommendations,
});

export default connect(mapStateToProps, {
	addToCart,
	loadProduct,
	startSession,
	updateSession,
})(ProductView);
