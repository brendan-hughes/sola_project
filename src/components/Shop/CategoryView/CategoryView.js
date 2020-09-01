import React, { Fragment, Component } from 'react';
import CategoryGridItem from './CategoryGridItem';
import Sidebar from '../Sidebar/Sidebar';
import './categoryview.css';
import navFunctionality from '../../../scripts/navFunctionality';
import { connect } from 'react-redux';
import { loadShop } from '../../../actions/shop';
import TagManager from 'react-gtm-module';

class CategoryView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentcat: window.location.pathname,
		};
	}

	componentDidMount() {
		navFunctionality();
		this.props.loadShop(window.location.pathname).then(() => {
			TagManager.dataLayer({
				dataLayer: {
					page: 'shop',
					shopCategory: this.props.category,
				},
			});
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.currentcat !== window.location.pathname) {
			this.props.loadShop(window.location.pathname).then(() => {
				TagManager.dataLayer({
					dataLayer: {
						page: 'shop',
						shopCategory: this.props.category,
					},
				});
			});
			this.setState({ currentcat: window.location.pathname });
		}
	}

	render() {
		return (
			<Fragment>
				<Sidebar />
				<section className="categoryViewSection">
					<h1 className="categoryViewHeader">{this.props.category}</h1>
					<div className="categoryGrid">
						{this.props.relevantProducts.map((product) => (
							<CategoryGridItem
								key={product.sku}
								productTitle={product.name}
								productDescription={product.description}
								productPrice={product.price}
								productSku={product.sku}
								productImage={product.images[0]}
							/>
						))}
					</div>
				</section>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	relevantProducts: state.shop.productList,
	category: state.shop.currentCategory,
});

export default connect(mapStateToProps, { loadShop })(CategoryView);
