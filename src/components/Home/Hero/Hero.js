import React, { Fragment } from 'react';
import { TiArrowLeft, TiArrowRight, TiPlus } from 'react-icons/ti';
import { IconContext } from 'react-icons';
import './hero.css';

function Hero() {
	return (
		<Fragment>
			<div className="border">
				<section className="hero">
					<div className="leftHero">
						<h2>Solar is the future</h2>
						<h1 className="heroHeader">
							Time to get <span className="colorize">Sola</span>
						</h1>
						<p>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
							facilis fuga cumque deserunt error alias ut magni eveniet rerum
							at.
						</p>
						<div className="viewButtonHidden">
							<p className="viewButtonText">View More</p>
						</div>
					</div>
					<div className="rightHero">
						<div className="heroCard">
							<h1 className="cardTitle">Card Title</h1>
							<img
								src={require('../../../assets/solar_panel3.png')}
								className="imagePlaceholder"
							></img>
							<div className="cardFooter">
								<h3 className="cardValue">$500</h3>
								<div className="viewButton">
									<p className="viewButtonText">View More</p>
								</div>
							</div>
						</div>
					</div>
					<IconContext.Provider value={{ size: '50px' }}>
						<TiArrowLeft className="leftArrow" />
					</IconContext.Provider>
					<IconContext.Provider value={{ size: '50px' }}>
						<TiArrowRight className="rightArrow" />
					</IconContext.Provider>
				</section>
			</div>
		</Fragment>
	);
}

export default Hero;
