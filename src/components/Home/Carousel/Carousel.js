import React, { Fragment } from 'react';
import './carousel.css';

function Carousel() {
	return (
		<Fragment>
			<section className="carouselSection">
				<h1 className="carouselHeader">Cutting Edge Tech</h1>
				<div className="carouselContainer">
					<div className="carouselItem"></div>
					<div className="carouselItem"></div>
					<div className="carouselItem"></div>
				</div>
			</section>
		</Fragment>
	);
}

export default Carousel;
