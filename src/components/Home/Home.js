import React, { Fragment } from 'react';
import { TiArrowLeft, TiArrowRight, TiPlus } from 'react-icons/ti';
import Hero from './Hero/Hero';
import About from './About/About';
import Carousel from './Carousel/Carousel';
import VideoCutout from './VideoCutout/VideoCutout';
import Footer from './Footer/Footer';

function Home() {
	return (
		<Fragment>
			<Hero />
			<About />
			<Carousel />
			<VideoCutout />
			<Footer />
		</Fragment>
	);
}

export default Home;
