import React, { Component, Fragment } from 'react';
import './about.css';
import { Link } from 'react-router-dom';
import { MdWbSunny } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { addToCart } from '../../../actions/cart';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { TiArrowLeft, TiArrowRight } from 'react-icons/ti';
const productAddToCart = (e, props, sku) => {
	if (!localStorage.getItem('cartToken')) {
		const cartToken = uuid();
		localStorage.setItem('cartToken', cartToken);
	}
	e.preventDefault();
	props.addToCart(sku, localStorage.getItem('cartToken'), 1);
};
class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPosition: 1,
		};
	}
	render() {
		const handleNav = (change) => {
			const aboutCardOne = document.querySelector('#aboutCardOne');
			const aboutCardTwo = document.querySelector('#aboutCardTwo');
			const aboutCardThree = document.querySelector('#aboutCardThree');
			const aboutNavIconOne = document.querySelector('#aboutNavButtonOne');
			const aboutNavIconTwo = document.querySelector('#aboutNavButtonTwo');
			const aboutNavIconThree = document.querySelector('#aboutNavButtonThree');
			if (change === 1) {
				aboutCardOne.classList.add('aboutCardActive');
				aboutCardOne.classList.remove('aboutCardLeft');
				aboutCardTwo.classList.remove('aboutCardLeft');
				aboutCardTwo.classList.add('aboutCardRight');
				aboutCardTwo.classList.remove('aboutCardActive');
				aboutCardThree.classList.add('aboutCardRight');
				aboutCardThree.classList.remove('aboutCardActive');
				aboutNavIconOne.classList.add('aboutNavButtonActive');
				aboutNavIconTwo.classList.remove('aboutNavButtonActive');
				aboutNavIconThree.classList.remove('aboutNavButtonActive');
				this.setState({ currentPosition: 1 });
			} else if (change === 2) {
				aboutCardOne.classList.add('aboutCardLeft');
				aboutCardOne.classList.remove('aboutCardActive');
				aboutCardTwo.classList.add('aboutCardActive');
				aboutCardTwo.classList.remove('aboutCardLeft');
				aboutCardTwo.classList.remove('aboutCardRight');
				aboutCardThree.classList.add('aboutCardRight');
				aboutCardThree.classList.remove('aboutCardActive');
				aboutNavIconOne.classList.remove('aboutNavButtonActive');
				aboutNavIconTwo.classList.add('aboutNavButtonActive');
				aboutNavIconThree.classList.remove('aboutNavButtonActive');
				this.setState({ currentPosition: 2 });
			} else if (change === 3) {
				aboutCardOne.classList.add('aboutCardLeft');
				aboutCardOne.classList.remove('aboutCardActive');
				aboutCardTwo.classList.add('aboutCardLeft');
				aboutCardTwo.classList.remove('aboutCardActive');
				aboutCardTwo.classList.remove('aboutCardRight');
				aboutCardThree.classList.add('aboutCardActive');
				aboutCardThree.classList.remove('aboutCardRight');
				aboutNavIconOne.classList.remove('aboutNavButtonActive');
				aboutNavIconTwo.classList.remove('aboutNavButtonActive');
				aboutNavIconThree.classList.add('aboutNavButtonActive');
				this.setState({ currentPosition: 3 });
			}
		};
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
							<Link
								className="gridLink aboutProductLink"
								to={`/product/981241112`}
							>
								<div className="aboutProductCard" id="aboutCardOne">
									<div className="upperGridItem">
										<h2 className="gridItemTitle " id="aboutItemTitle">
											Panel Pursuit
										</h2>
										<p className="gridItemPrice">$250</p>

										<img
											alt="productImage"
											className="gridItemImage"
											id="aboutItemImage"
											src={require('../../../assets/solar_panel3.png')}
										></img>
									</div>
									<div className="lowerGridItem">
										<div className="detailsLine" id="aboutDetailsLine">
											<button className="gridViewDetailsButton aboutViewDetailsButton">
												<p className="gridItemDetailHeader aboutItemDetailHeader">
													Product Details
												</p>
											</button>

											<button
												className="gridAddToCartButton aboutAddToCartButton"
												onClick={(e) =>
													productAddToCart(e, this.props, '981241112')
												}
											>
												<p className="gridItemDetailHeaderWhite">Add To Cart</p>
												<IconContext.Provider value={{ size: '20px' }}>
													<AiOutlineShoppingCart className="gridCartIcon aboutCartIcon" />
												</IconContext.Provider>
											</button>
										</div>

										<p className="gridItemDetailText" id="aboutItemDetailText">
											Lorem, ipsum dolor sit amet consectetur adipisicing elit.
											Similique consequuntur sapiente sint voluptatem eos.
											Minima molestiae eius delectus exercitationem tempora
											assumenda tenetur. Aspernatur sequi eaque saepe deleniti,
											nobis animi vero.
										</p>
									</div>
								</div>
							</Link>

							<Link
								className="gridLink aboutProductLink"
								to={`/product/774421787`}
							>
								<div
									className="aboutProductCard aboutCardRight"
									id="aboutCardTwo"
								>
									<div className="upperGridItem">
										<h2 className="gridItemTitle " id="aboutItemTitle">
											Battery Grow
										</h2>
										<p className="gridItemPrice">$150</p>

										<img
											alt="productImage"
											className="gridItemImage"
											id="aboutItemImage"
											src={require('../../../assets/battery2.png')}
										></img>
									</div>
									<div className="lowerGridItem">
										<div className="detailsLine" id="aboutDetailsLine">
											<button className="gridViewDetailsButton aboutViewDetailsButton">
												<p className="gridItemDetailHeader aboutItemDetailHeader">
													Product Details
												</p>
											</button>

											<button
												className="gridAddToCartButton aboutAddToCartButton"
												onClick={(e) =>
													productAddToCart(e, this.props, '774421787')
												}
											>
												<p className="gridItemDetailHeaderWhite">Add To Cart</p>
												<IconContext.Provider value={{ size: '20px' }}>
													<AiOutlineShoppingCart className="gridCartIcon aboutCartIcon" />
												</IconContext.Provider>
											</button>
										</div>

										<p className="gridItemDetailText" id="aboutItemDetailText">
											Lorem, ipsum dolor sit amet consectetur adipisicing elit.
											Similique consequuntur sapiente sint voluptatem eos.
											Minima molestiae eius delectus exercitationem tempora
											assumenda tenetur. Aspernatur sequi eaque saepe deleniti,
											nobis animi vero.
										</p>
									</div>
								</div>
							</Link>

							<Link
								className="gridLink aboutProductLink"
								to={`/product/463381407`}
							>
								<div
									className="aboutProductCard aboutCardRight"
									id="aboutCardThree"
								>
									<div className="upperGridItem">
										<h2 className="gridItemTitle " id="aboutItemTitle">
											Shift Lights
										</h2>
										<p className="gridItemPrice">$175</p>

										<img
											alt="productImage"
											className="gridItemImage"
											id="aboutItemImage"
											src={require('../../../assets/light1.png')}
										></img>
									</div>
									<div className="lowerGridItem">
										<div className="detailsLine" id="aboutDetailsLine">
											<button className="gridViewDetailsButton aboutViewDetailsButton">
												<p className="gridItemDetailHeader aboutItemDetailHeader">
													Product Details
												</p>
											</button>

											<button
												className="gridAddToCartButton aboutAddToCartButton"
												onClick={(e) =>
													productAddToCart(e, this.props, '463381407')
												}
											>
												<p className="gridItemDetailHeaderWhite">Add To Cart</p>
												<IconContext.Provider value={{ size: '20px' }}>
													<AiOutlineShoppingCart className="gridCartIcon aboutCartIcon" />
												</IconContext.Provider>
											</button>
										</div>

										<p className="gridItemDetailText" id="aboutItemDetailText">
											Lorem, ipsum dolor sit amet consectetur adipisicing elit.
											Similique consequuntur sapiente sint voluptatem eos.
											Minima molestiae eius delectus exercitationem tempora
											assumenda tenetur. Aspernatur sequi eaque saepe deleniti,
											nobis animi vero.
										</p>
									</div>
								</div>
							</Link>
						</div>
						<div className="aboutNav">
							<button
								onClick={() => handleNav(1)}
								className="aboutNavButton aboutNavButtonActive"
								id="aboutNavButtonOne"
							></button>
							<button
								onClick={() => handleNav(2)}
								className="aboutNavButton"
								id="aboutNavButtonTwo"
							></button>
							<button
								onClick={() => handleNav(3)}
								className="aboutNavButton"
								id="aboutNavButtonThree"
							></button>
						</div>
					</div>
				</section>
			</Fragment>
		);
	}
}

export default connect(null, { addToCart })(About);
