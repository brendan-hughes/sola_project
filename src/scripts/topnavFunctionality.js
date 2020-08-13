function topnavFunctionality() {
	let open = false;
	hoverFunctionality(
		open,
		'.shopNavLink',
		'.shopDetails',
		50,
		-10,
		140,
		10,
		420,
		140,
		-10
	);
	hoverFunctionality(
		open,
		'.contactNavLink',
		'.contactDetails',
		50,
		-10,
		135,
		10,
		120,
		135,
		-10
	);
	searchBarAnimation();
	firstAnimation();
}

function searchBarAnimation() {
	const searchBarInput = document.querySelector('.searchBarInput');
	const searchIcon = document.querySelector('.searchIcon');
	const searchBar = document.querySelector('.searchBar');
	searchBar.addEventListener('mouseover', () => {
		searchBarInput.classList.add('searchBarActive');
		searchIcon.classList.add('searchIconActive');
	});
	searchBar.addEventListener('mouseout', () => {
		searchBarInput.classList.remove('searchBarActive');
		searchIcon.classList.remove('searchIconActive');
	});
	searchIcon.addEventListener('click', () => {
		if (!searchBarInput.value) {
			searchBarInput.focus();
		}
	});
}

function hoverFunctionality(
	open,
	specifiedLink,
	specifiedDetails,
	y1,
	y2,
	x1,
	x2,
	y3,
	x3,
	x4
) {
	window.addEventListener('mousemove', (e) => {
		const navLink = document.querySelector(specifiedLink);
		const detailsDiv = document.querySelector(specifiedDetails);
		let detailsDivPlace;
		try {
			detailsDivPlace = navLink.getBoundingClientRect();
		} catch (error) {
			console.log(error);
		}
		// console.log(e.clientY - detailsDivPlace.y);
		// console.log(e.clientX - detailsDivPlace.x);

		try {
			if (
				open !== true &&
				e.clientY - detailsDivPlace.y <= y1 &&
				e.clientY - detailsDivPlace.y > y2 &&
				e.clientX - detailsDivPlace.x <= x1 &&
				e.clientX - detailsDivPlace.x > x2
			) {
				// console.log('OPENING');
				open = true;
				detailsDiv.style.display = 'flex';
			} else if (
				open === true &&
				(e.clientY - detailsDivPlace.y > y3 ||
					e.clientX - detailsDivPlace.x > x3 ||
					e.clientX - detailsDivPlace.x < x4)
			) {
				// console.log('delete');
				detailsDiv.style.display = 'none';
				open = false;
			}
		} catch (error) {
			console.log(error);
		}
	});
}

function firstAnimation() {
	window.addEventListener('scroll', (e) => {
		// const navBar = document.querySelector('.navbar');
		// const navLinks = document.querySelectorAll('.navLink');
		// const navIcons = document.querySelectorAll('.navIcon');
		// const aboutSection = document.querySelector('.aboutSection');
		// const carouselSection = document.querySelector('.carouselSection');
		// const heroSection = document.querySelector('.hero');
		const videoCutoutSection = document.querySelector('.videoCutoutSection');
		if (videoCutoutSection) {
			const videoCutoutSectionHeight = videoCutoutSection.getBoundingClientRect()
				.top;
			if (videoCutoutSectionHeight <= 0) {
			}
		}
	});
}

//Get x coordinates of each nav link
//If mouse is over nav bar, check the x coordinate of the mouse
//If the mouse coordinate is between Shop and contact, display shop div
//If the mouse is between contact and search, display contact div
//Seperately, if you click search, it expands to display input
//If you click cart, it expands the cart div
//If you click sign in/register, it directs you to sign in page

export default topnavFunctionality;
