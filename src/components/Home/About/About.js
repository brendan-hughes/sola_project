import React, { Fragment } from 'react';
import './about.css';
import { MdWbSunny } from 'react-icons/md';
import { IconContext } from 'react-icons';

function About() {
	return (
		<Fragment>
			<section className="aboutSection">
				<div className="aboutHeaderContainer" data-aos="zoom-out-right">
					<IconContext.Provider value={{ color: '#E6C229', size: '60px' }}>
						<div className="aboutIcon">
							<MdWbSunny className="aboutIcon" />
						</div>
					</IconContext.Provider>
					<h1 className="aboutHeader">Why Sola?</h1>
				</div>
				<div className="aboutTextContainer">
					<p className="aboutText" data-aos="fade-right">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
						ad animi molestias tenetur asperiores ab debitis repellendus rerum
						accusamus ducimus eligendi?
					</p>
					<p className="aboutText" data-aos="fade-right">
						Vel praesentium facere voluptas modi a porro iure velit non nesciunt
						harum, officiis sapiente laudantium debitis error voluptate in.
						Veniam commodi pariatur, sint itaque rerum tenetur sed nemo
						accusantium?
					</p>
					<p className="aboutText" data-aos="fade-right">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur
						eum odit aliquam, delectus, soluta dolorem vel inventore officia
						ipsa, quo eligendi mollitia numquam? Quidem, modi amet! Aperiam vel
						ab cumque?
					</p>
				</div>
				<div className="aboutAchievmentsContainer">
					<div
						className="aboutAchievementCard"
						id="achievementA"
						data-aos="fade-right"
					></div>
					<div
						className="aboutAchievementCard"
						id="achievementB"
						data-aos="fade-right"
						data-aos-delay="300"
					></div>
					<div
						className="aboutAchievementCard"
						id="achievementC"
						data-aos="fade-right"
						data-aos-delay="600"
					></div>
				</div>
				<img
					className="gradientImage"
					src={require('../../../assets/blue_gradient_com.png')}
					data-aos="zoom-in-left"
				/>
			</section>
		</Fragment>
	);
}

export default About;
