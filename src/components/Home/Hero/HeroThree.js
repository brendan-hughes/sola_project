import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './hero.css';

class HeroThree extends Component {
	render() {
		return (
			<div className="heroThreeContainer">
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
						<h1 className="cardTitle">Panel Alpha</h1>
						<img
							alt="Product View"
							src={require('../../../assets/panelalpha.png')}
							className="imagePlaceholder"
						></img>
						<div className="cardFooter">
							<h3 className="cardValue">$150</h3>
							<Link className="heroLink" to={'/product/265903905'}>
								<div className="viewButton">
									<p className="viewButtonText">View More</p>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default HeroThree;
