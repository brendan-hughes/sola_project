import React, { Fragment, Component } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaStore } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IconContext } from 'react-icons';
import Sidebar from '../Sidebar/Sidebar';
import navFunctionality from '../../../scripts/navFunctionality';
import './productview.css';

class ProductView extends Component {
	componentDidMount() {
		navFunctionality();
	}

	render() {
		return (
			<Fragment>
				<Sidebar />
				<section className="productViewSection">
					<div className="productViewBackButtonDiv">
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
							<p className="productViewCategoryTypeText">PANELS</p>
						</div>
						<h1 className="productViewHeader">Product Title</h1>
						<p className="skuHeader">SKU: 0293847362849</p>
						<p className="productViewDescription">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus eaque eos dicta, nobis quaerat corporis consequuntur
							vel perferendis, odit voluptates assumenda delectus modi
							reiciendis voluptatum minus ex reprehenderit vero explicabo.
						</p>
						<div className="productViewQuantAndValueDiv">
							<div className="productViewQuantityDiv">
								<p className="productViewQuantityHeader">QUANTITY</p>
								<div className="productViewQuantityButton">
									<div className="productViewQuantityButtonNegative">-</div>
									<p className="productViewQuantityButtonValue">1</p>
									<div className="productViewQuantityButtonPositive">+</div>
								</div>
							</div>
							<p className="productViewPriceValue">$100</p>
						</div>
						<button className="productViewAddToCart">
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

export default ProductView;
