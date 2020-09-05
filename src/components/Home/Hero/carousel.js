const handleCarousel = (state, change) => {
	if (state.currentPosition === 1 && change === 1) {
		console.log('1 to 2');
		this.setState({
			currentPosition: 2,
		});
		const heroOne = document.querySelector('#heroOne');
		const heroTwo = document.querySelector('#heroTwo');
		const navIconOne = document.querySelector('#heroNavButtonOne');
		const navIconTwo = document.querySelector('#heroNavButtonTwo');
		heroOne.classList.add('heroSlideLeft');
		heroOne.classList.remove('heroSlideActive');
		heroTwo.classList.add('heroSlideActive');
		heroTwo.classList.remove('heroSlideRight');
		navIconOne.classList.remove('heroNavButtonActive');
		navIconTwo.classList.add('heroNavButtonActive');
	} else if (state.currentPosition === 2 && change === 1) {
		console.log('goinnn');
		const heroTwo = document.querySelector('#heroTwo');
		const heroThree = document.querySelector('#heroThree');
		const navIconTwo = document.querySelector('#heroNavButtonTwo');
		const navIconThree = document.querySelector('#heroNavButtonThree');
		heroTwo.classList.add('heroSlideLeft');
		heroTwo.classList.remove('heroSlideActive');
		heroThree.classList.add('heroSlideActive');
		heroThree.classList.remove('heroSlideRight');
		navIconTwo.classList.remove('heroNavButtonActive');
		navIconThree.classList.add('heroNavButtonActive');
		this.setState({ currentPosition: 3 });
		console.log('Moved from 2 to 3');
		console.log(this.state);
	} else {
		console.log(state.currentPosition);
		console.log(change);
		console.log(state.currentPosition === 2 && change === 1);
	}
};

export default handleCarousel;
