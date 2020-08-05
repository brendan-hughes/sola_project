import React, { Fragment, Component } from 'react';
import CategoryGridItem from './CategoryGridItem';
import Sidebar from '../Sidebar/Sidebar';
import './categoryview.css';
import navFunctionality from '../../../scripts/navFunctionality';

class CategoryView extends Component {
	componentDidMount() {
		navFunctionality();
	}

	render() {
		return (
			<Fragment>
				<Sidebar />
				<section className="categoryViewSection">
					<h1 className="categoryViewHeader">Category Header</h1>
					<div className="categoryGrid">
						<CategoryGridItem title="Product A" />
						<CategoryGridItem title="Product B" />
						<CategoryGridItem title="Product C" />
						<CategoryGridItem title="Product D" />
					</div>
				</section>
			</Fragment>
		);
	}
}

export default CategoryView;
