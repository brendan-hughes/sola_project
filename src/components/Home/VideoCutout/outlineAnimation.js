export const addAnimationListener = () => {
	const cutout = document.querySelector('.imageWithCutout');
	if (cutout !== null) {
		window.addEventListener('scroll', runAnimation);
	}
};

export const removeAnimationListener = () => {
	console.log('Removing listener');
	window.removeEventListener('scroll', runAnimation);
};

const runAnimation = () => {
	const cutout = document.querySelector('.imageWithCutout');
	const cutoutY = cutout.getBoundingClientRect().top; // The elements distance from the top of the browser.
	const windowHeight = window.innerHeight;
	if (cutoutY - windowHeight <= -200) {
		const outline = document.querySelectorAll('.solaOutline path');
		const imageWithCutout = document.querySelector('.imageWithCutout');
		outline.forEach((item) => {
			item.classList.add('animation');
		});
		setTimeout(() => {
			if (imageWithCutout !== null) {
				imageWithCutout.classList.add('showImage');
				imageWithCutout.classList.remove('hiddenImage');
				outline.forEach((item) => {
					item.classList.add('pathFill');
					item.classList.remove('pathEmpty');
				});
			}
		}, 2000);
	}
};
