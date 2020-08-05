import React, { Fragment, Component } from 'react';
import Sidebar from './Sidebar/Sidebar';
import ProductView from './ProductView/ProductView';
import CategoryView from './CategoryView/CategoryView';
import BrandView from './BrandView/BrandView';
import navFunctionality from '../../scripts/navFunctionality';

class Shop extends Component {
	componentDidMount() {
		navFunctionality();
	}

	render() {
		return (
			<Fragment>
				<Sidebar />
				<CategoryView />
			</Fragment>
		);
	}
}

export default Shop;
