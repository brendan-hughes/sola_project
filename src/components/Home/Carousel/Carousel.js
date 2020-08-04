import React, { Fragment } from 'react';
import './carousel.css';

function Carousel() {
	return (
		<Fragment>
			<section className="carouselSection">
				<h1 className="carouselHeader">Cutting Edge Tech</h1>
				<div className="carouselContainer">
					<div
						className="carouselItem"
						data-aos="flip-up"
						data-aos-duration="1000"
					></div>
					<div
						className="carouselItem"
						data-aos="flip-down"
						data-aos-delay="300"
						data-aos-duration="1000"
					></div>
					<div
						className="carouselItem"
						data-aos="flip-right"
						data-aos-delay="600"
						data-aos-duration="1000"
					></div>
				</div>
			</section>
		</Fragment>
	);
}

export default Carousel;
