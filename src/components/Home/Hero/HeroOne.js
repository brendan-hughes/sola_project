import React, { Component, Fragment } from 'react';
import './hero.css';

class HeroOne extends Component {
	render() {
		return (
			<div className="heroOneContainer">
				<div className="leftHero">
					<h2 className="heroSubheader">Solar is the future</h2>
					<h1 className="heroHeader">
						Time to get <span className="colorize">Sola</span>
					</h1>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
						facilis fuga cumque deserunt error alias ut magni eveniet rerum at.
					</p>
					<div className="viewButtonHidden">
						<p className="viewButtonText">View More</p>
					</div>
				</div>

				<div className="rightHero">
					<div className="heroCard">
						<h1 className="cardTitle">Card Title</h1>
						<img
							alt="Product View"
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
			</div>
		);
	}
}

export default HeroOne;
