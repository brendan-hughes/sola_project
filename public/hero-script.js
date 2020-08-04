const cutoutText = document.querySelector('.cutoutText');

let currentCutoutHeight = cutoutText.getBoundingClientRect().bottom;
let windowHeight = window.innerHeight;

window.addEventListener('scroll', (e) => {
	currentCutoutHeight = cutoutText.getBoundingClientRect().bottom;
	windowHeight = window.innerHeight;
	if (
		(currentCutoutHeight === windowHeight ||
			currentCutoutHeight < windowHeight) &&
		!cutoutText.classList.contains('growCutoutText')
	) {
		console.log('Grow!');
		cutoutText.classList.add('growCutoutText');
	} else if (
		currentCutoutHeight > windowHeight &&
		cutoutText.classList.contains('growCutoutText')
	) {
		console.log('Shrink!');
		cutoutText.classList.remove('growCutoutText');
	}
});
