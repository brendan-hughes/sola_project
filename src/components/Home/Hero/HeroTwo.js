import React, { Component, Fragment } from 'react';
import './hero.css';
import { Link } from 'react-router-dom';

class HeroTwo extends Component {
	render() {
		return (
			<div className="heroTwoContainer">
				<div className="heroTwoBubble">
					<h2 className="heroSubheaderTwo">Solar is the future</h2>
					<h1 className="heroHeaderTwo">
						Time to get <span className="colorize">Sola</span>
					</h1>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
						facilis fuga cumque deserunt error alias ut magni eveniet rerum at.
					</p>
					<Link className="heroLink heroLinkTwo" to={'/findstore'}>
						<div className="heroTwoViewButton">
							<p className="viewButtonText">View More</p>
						</div>
					</Link>
				</div>
			</div>
		);
	}
}

export default HeroTwo;
