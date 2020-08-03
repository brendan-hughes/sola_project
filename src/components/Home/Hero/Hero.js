import React, { Fragment } from 'react';
import { TiArrowLeft, TiArrowRight, TiPlus } from 'react-icons/ti';

function Hero() {
	return (
		<Fragment>
			<section className="hero">
				<div className="leftHero">
					<h1>Hero Title</h1>
					<ul>
						<li>
							<p>Note 1</p>
						</li>
						<li>
							<p>Note 2</p>
						</li>
					</ul>
					<div className="arrows">
						<TiArrowLeft />
						<span className="rightArrow">
							<TiArrowRight />
						</span>
					</div>
				</div>
				<div className="rightHero">
					<div className="heroCard">
						<h1>Card Title</h1>
						<div className="imagePlaceholder"></div>
						<div className="cardFooter">
							<h3 className="cardValue">$500</h3>
							<TiPlus />
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
}

export default Hero;
