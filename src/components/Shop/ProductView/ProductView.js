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
		this.state = { quantityMeasure: 1 };
	}

	componentDidMount() {
		navFunctionality();
		this.props.loadProduct(window.location.pathname);
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
							<img
								alt="Product View"
								className="productViewMainImage"
								src={require('../../../assets/solar_panel3.png')}
							></img>
						</div>
						<div className="productViewSubImageCarousel">
							<img
								alt="Alternate Product View"
								className="productViewSubImage"
							></img>
							<img
								alt="Alternate Product View"
								className="productViewSubImage"
							></img>
							<img
								alt="Alternate Product View"
								className="productViewSubImage"
							></img>
							<img
								alt="Alternate Product View"
								className="productViewSubImage"
							></img>
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
