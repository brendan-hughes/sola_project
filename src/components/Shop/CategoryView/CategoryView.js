import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons';
import CategoryGridItem from './CategoryGridItem';
import './categoryview.css';

function CategoryView() {
	return (
		<Fragment>
			<section className="categoryViewSection">
				<h1 className="categoryViewHeader">Category Header</h1>
				<div className="categoryGrid">
					<CategoryGridItem title="Product A" />
					<CategoryGridItem title="Product B" />
					<CategoryGridItem title="Product C" />
				</div>
			</section>
		</Fragment>
	);
}

export default CategoryView;
