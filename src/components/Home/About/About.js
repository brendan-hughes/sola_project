import React, { Component, Fragment } from 'react';
import './about.css';
import { MdWbSunny } from 'react-icons/md';
import { IconContext } from 'react-icons';

class About extends Component {
	render() {
		return (
			<Fragment>
				<section className="aboutSection">
					<div className="leftAbout">
						<div className="aboutHeaderContainer">
							<h1 className="aboutHeader">Why Sola?</h1>{' '}
							<div className="aboutIcon">
								<img
									className="aboutIconImage"
									src={require('../../../assets/solarpanelicon.png')}
								></img>
							</div>
						</div>
						<div className="aboutTextContainer">
							<p className="aboutText">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Obcaecati, ad animi molestias tenetur asperiores ab debitis
								repellendus rerum accusamus ducimus eligendi?
							</p>
							<p className="aboutText">
								Vel praesentium facere voluptas modi a porro iure velit non
								nesciunt harum, officiis sapiente laudantium debitis error
								voluptate in. Veniam commodi pariatur, sint itaque rerum tenetur
								sed nemo accusantium?
							</p>
							<p className="aboutText">
								Lorem ipsum dolor sit amet consectetur, adipisicing elit.
								Tenetur eum odit aliquam, delectus, soluta dolorem vel inventore
								officia ipsa, quo eligendi mollitia numquam? Quidem, modi amet!
								Aperiam vel ab cumque?
							</p>
						</div>
						<div className="aboutAchievmentsContainer">
							<div
								className="aboutAchievementCard carouselCard"
								id="achievementA"
							>
								<p className="topAchievementText">HISTORICALLY GREAT</p>
								<hr></hr>
								<p className="middleAchievementText">1.5M</p>
								<hr></hr>
								<p className="bottomAchievementText">CUSTOMERS SERVED</p>
							</div>
							<div className="aboutAchievementCard" id="achievementB">
								<p className="topAchievementText">BEST IN CLASS</p>
								<hr></hr>
								<p className="middleAchievementText">#1</p>
								<hr></hr>
								<p className="bottomAchievementText">SOLAR PROVIDER</p>
							</div>
							<div className="aboutAchievementCard" id="achievementC">
								<p className="topAchievementText">SAVE MORE</p>
								<hr></hr>
								<p className="middleAchievementText">70%</p>
								<hr></hr>
								<p className="bottomAchievementText">AVERAGE SAVINGS</p>
							</div>
						</div>
					</div>
					<div className="rightAbout">
						<div className="aboutProductCarousel">
							<div className="upperGridItem">
								<h2 className="gridItemTitle">Title</h2>
								<p className="gridItemPrice">$</p>

								<img alt="productImage" className="gridItemImage"></img>
							</div>
							<div className="lowerGridItem">
								<div className="detailsLine"></div>
							</div>
						</div>
					</div>
				</section>
			</Fragment>
		);
	}
}

export default About;
