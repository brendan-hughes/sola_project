import TagManager from 'react-gtm-module';

let status = false;

function homeFunctionality() {
	const cutout = document.querySelector('.videoCutoutText');
	if (cutout !== null) {
		window.addEventListener('scroll', (e) => {
			const cutoutHeight = cutout.getBoundingClientRect().top;

			if (cutoutHeight <= 200 && status === false) {
				status = true;
				TagManager.dataLayer({
					dataLayer: {
						viewedBanner: 'yes',
					},
				});
			}
		});
	}
}

export default homeFunctionality;
