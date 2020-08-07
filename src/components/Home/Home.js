import React, { Fragment, Component } from 'react';
import Hero from './Hero/Hero';
import About from './About/About';
import Carousel from './Carousel/Carousel';
import VideoCutout from './VideoCutout/VideoCutout';
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
