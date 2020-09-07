import React, { Fragment, Component } from 'react';
import './home.css';
import Hero from './Hero/Hero';
import About from './About/About';
import Carousel from './Carousel/Carousel';
import ReverseCarousel from './Carousel/ReverseCarousel';
import VideoCutout from './VideoCutout/VideoCutout';
import homeFunctionality from '../../scripts/homeFunctionality';
import TagManager from 'react-gtm-module';

class Home extends Component {
	constructor(props) {
		super(props);
		TagManager.dataLayer({
			dataLayer: {
				page: 'home',
			},
		});
	}

	componentDidMount() {
		homeFunctionality();
	}

	render() {
		return (
			<Fragment>
				<div className="specialCarousel"></div>
				<Carousel />
				<Hero />
				<ReverseCarousel />
				<About />
				<Carousel />
				<VideoCutout />
				<ReverseCarousel />
			</Fragment>
		);
	}
}

export default Home;
