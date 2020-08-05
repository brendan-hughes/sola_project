import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import './categoryview.css';

function CategoryGridItem(props) {
	return (
		<Fragment>
			<Link className="gridLink" to="/product">
				<div className="categoryGridItem">
					<div className="upperGridItem">
						<h2 className="gridItemTitle">{props.title}</h2>
						<p className="gridItemPrice">$100</p>
						<img
							className="gridItemImage"
							src={require('../../../assets/solar_panel3.png')}
						></img>
					</div>
					<div className="lowerGridItem">
						<div className="detailsLine">
							<button className="gridViewDetailsButton">
								<p className="gridItemDetailHeader">Product Details</p>
							</button>

							<button className="gridAddToCartButton">
								<p className="gridCartText">Add To Cart</p>
								<IconContext.Provider value={{ size: '20px' }}>
									<AiOutlineShoppingCart className="gridCartIcon" />
								</IconContext.Provider>
							</button>
						</div>

						<p className="gridItemDetailText">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
							ad assumenda ab sapiente vitae? Adipisci!
						</p>
					</div>
				</div>
			</Link>
		</Fragment>
	);
}

export default CategoryGridItem;
