import React, { Fragment, Component } from 'react';
import { TiArrowLeft, TiArrowRight, TiPlus } from 'react-icons/ti';
import Hero from './Hero/Hero';
import About from './About/About';
import Carousel from './Carousel/Carousel';
import VideoCutout from './VideoCutout/VideoCutout';
import Footer from './Footer/Footer';
import homeFunctionality from '../../scripts/homeFunctionality';

class Home extends Component {
	componentDidMount() {
		homeFunctionality();
	}

	render() {
		return (
			<Fragment>
				<Hero />
				<About />
				<Carousel />
				<VideoCutout />
			</Fragment>
		);
	}
}

export default Home;
