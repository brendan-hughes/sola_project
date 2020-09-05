import React, { Component, Fragment } from 'react';
import HeroOne from './HeroOne';
import HeroTwo from './HeroTwo';
import HeroThree from './HeroThree';
import { TiArrowLeft, TiArrowRight } from 'react-icons/ti';
import { IconContext } from 'react-icons';
import './hero.css';
import handleCarousel from './carousel';

class Hero extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPosition: 1,
		};
	}

	render() {
		const handleCarousel = (state, change) => {
			const heroOne = document.querySelector('#heroOne');
			const heroTwo = document.querySelector('#heroTwo');
			const heroThree = document.querySelector('#heroThree');
			const navIconOne = document.querySelector('#heroNavButtonOne');
			const navIconTwo = document.querySelector('#heroNavButtonTwo');
			const navIconThree = document.querySelector('#heroNavButtonThree');
			const rightArrow = document.querySelector('.rightArrow');
			const leftArrow = document.querySelector('.leftArrow');
			if (state.currentPosition === 1 && change === 1) {
				leftArrow.classList.add('arrow');
				leftArrow.classList.remove('hiddenArrow');
				heroOne.classList.add('heroSlideLeft');
				heroOne.classList.remove('heroSlideActive');
				heroTwo.classList.add('heroSlideActive');
				heroTwo.classList.remove('heroSlideRight');
				navIconOne.classList.remove('heroNavButtonActive');
				navIconTwo.classList.add('heroNavButtonActive');
				this.setState({
					currentPosition: 2,
				});
			} else if (state.currentPosition === 2 && change === 1) {
				rightArrow.classList.add('hiddenArrow');
				rightArrow.classList.remove('arrow');
				heroTwo.classList.add('heroSlideLeft');
				heroTwo.classList.remove('heroSlideActive');
				heroThree.classList.add('heroSlideActive');
				heroThree.classList.remove('heroSlideRight');
				navIconTwo.classList.remove('heroNavButtonActive');
				navIconThree.classList.add('heroNavButtonActive');
				this.setState({ currentPosition: 3 });
			} else if (state.currentPosition === 3 && change === -1) {
				rightArrow.classList.add('arrow');
				rightArrow.classList.remove('hiddenArrow');
				heroThree.classList.add('heroSlideRight');
				heroThree.classList.remove('heroSlideActive');
				heroTwo.classList.add('heroSlideActive');
				heroTwo.classList.remove('heroSlideLeft');
				navIconThree.classList.remove('heroNavButtonActive');
				navIconTwo.classList.add('heroNavButtonActive');
				this.setState({ currentPosition: 2 });
			} else if (state.currentPosition === 2 && change === -1) {
				leftArrow.classList.add('hiddenArrow');
				leftArrow.classList.remove('arrow');
				heroTwo.classList.add('heroSlideRight');
				heroTwo.classList.remove('heroSlideActive');
				heroOne.classList.add('heroSlideActive');
				heroOne.classList.remove('heroSlideLeft');
				navIconTwo.classList.remove('heroNavButtonActive');
				navIconOne.classList.add('heroNavButtonActive');
				this.setState({ currentPosition: 1 });
			} else if (state.currentPosition === 3 && change === 1) {
				leftArrow.classList.add('hiddenArrow');
				leftArrow.classList.remove('arrow');
				heroOne.classList.add('heroSlideActive');
				heroOne.classList.remove('heroSlideLeft');
				heroTwo.classList.add('heroSlideRight');
				heroTwo.classList.remove('heroSlideActive');
				heroTwo.classList.remove('heroSlideLeft');
				heroThree.classList.add('heroSlideRight');
				heroThree.classList.remove('heroSlideActive');
				navIconOne.classList.add('heroNavButtonActive');
				navIconTwo.classList.remove('heroNavButtonActive');
				navIconThree.classList.remove('heroNavButtonActive');
				this.setState({ currentPosition: 1 });
			}
		};

		const handleNav = (change) => {
			const heroOne = document.querySelector('#heroOne');
			const heroTwo = document.querySelector('#heroTwo');
			const heroThree = document.querySelector('#heroThree');
			const navIconOne = document.querySelector('#heroNavButtonOne');
			const navIconTwo = document.querySelector('#heroNavButtonTwo');
			const navIconThree = document.querySelector('#heroNavButtonThree');
			const rightArrow = document.querySelector('.rightArrow');
			const leftArrow = document.querySelector('.leftArrow');
			if (change === 1) {
				rightArrow.classList.add('arrow');
				rightArrow.classList.remove('hiddenArrow');
				leftArrow.classList.add('hiddenArrow');
				leftArrow.classList.remove('arrow');
				heroOne.classList.add('heroSlideActive');
				heroOne.classList.remove('heroSlideLeft');
				heroTwo.classList.remove('heroSlideLeft');
				heroTwo.classList.add('heroSlideRight');
				heroTwo.classList.remove('heroSlideActive');
				heroThree.classList.add('heroSlideRight');
				heroThree.classList.remove('heroSlideActive');
				navIconOne.classList.add('heroNavButtonActive');
				navIconTwo.classList.remove('heroNavButtonActive');
				navIconThree.classList.remove('heroNavButtonActive');
				this.setState({ currentPosition: 1 });
			} else if (change === 2) {
				rightArrow.classList.add('arrow');
				rightArrow.classList.remove('hiddenArrow');
				leftArrow.classList.add('arrow');
				leftArrow.classList.remove('hiddenArrow');
				heroOne.classList.add('heroSlideLeft');
				heroOne.classList.remove('heroSlideActive');
				heroTwo.classList.add('heroSlideActive');
				heroTwo.classList.remove('heroSlideLeft');
				heroTwo.classList.remove('heroSlideRight');
				heroThree.classList.add('heroSlideRight');
				heroThree.classList.remove('heroSlideActive');
				navIconOne.classList.remove('heroNavButtonActive');
				navIconTwo.classList.add('heroNavButtonActive');
				navIconThree.classList.remove('heroNavButtonActive');
				this.setState({ currentPosition: 2 });
			} else if (change === 3) {
				rightArrow.classList.add('hiddenArrow');
				rightArrow.classList.remove('arrow');
				leftArrow.classList.add('arrow');
				leftArrow.classList.remove('hiddenArrow');
				heroOne.classList.add('heroSlideLeft');
				heroOne.classList.remove('heroSlideActive');
				heroTwo.classList.add('heroSlideLeft');
				heroTwo.classList.remove('heroSlideActive');
				heroTwo.classList.remove('heroSlideRight');
				heroThree.classList.add('heroSlideActive');
				heroThree.classList.remove('heroSlideRight');
				navIconOne.classList.remove('heroNavButtonActive');
				navIconTwo.classList.remove('heroNavButtonActive');
				navIconThree.classList.add('heroNavButtonActive');
				this.setState({ currentPosition: 3 });
			}
		};

		return (
			<Fragment>
				<div className="border">
					<section className="heroContainer">
						<ul className="heroTrack">
							<li className="heroSlide heroSlideActive" id="heroOne">
								<HeroOne />
							</li>

							<li className="heroSlide heroSlideRight" id="heroTwo">
								<HeroTwo />
							</li>
							<li className="heroSlide heroSlideRight" id="heroThree">
								<HeroThree />
							</li>
						</ul>
						<IconContext.Provider value={{ size: '50px' }}>
							<TiArrowLeft
								onClick={() => {
									handleCarousel(this.state, -1);
								}}
								className="hiddenArrow leftArrow"
							/>
						</IconContext.Provider>
						<IconContext.Provider value={{ size: '50px' }}>
							<TiArrowRight
								onClick={() => {
									handleCarousel(this.state, 1);
								}}
								className="arrow rightArrow"
							/>
						</IconContext.Provider>
						<div className="heroNav">
							<button
								onClick={() => handleNav(1)}
								className="heroNavButton heroNavButtonActive"
								id="heroNavButtonOne"
							></button>
							<button
								onClick={() => handleNav(2)}
								className="heroNavButton"
								id="heroNavButtonTwo"
							></button>
							<button
								onClick={() => handleNav(3)}
								className="heroNavButton"
								id="heroNavButtonThree"
							></button>
						</div>
					</section>
				</div>
			</Fragment>
		);
	}
}

export default Hero;
