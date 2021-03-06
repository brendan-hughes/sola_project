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
		if (window.innerWidth > 600) {
			searchBarInput.classList.add('searchBarActive');
			searchIcon.classList.add('searchIconActive');
		}
	});
	searchBar.addEventListener('mouseout', () => {
		if (window.innerWidth > 600) {
			searchBarInput.classList.remove('searchBarActive');
			searchIcon.classList.remove('searchIconActive');
		}
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

		try {
			if (
				open !== true &&
				e.clientY - detailsDivPlace.y <= y1 &&
				e.clientY - detailsDivPlace.y > y2 &&
				e.clientX - detailsDivPlace.x <= x1 &&
				e.clientX - detailsDivPlace.x > x2
			) {
				open = true;
				detailsDiv.style.display = 'flex';
			} else if (
				open === true &&
				(e.clientY - detailsDivPlace.y > y3 ||
					e.clientX - detailsDivPlace.x > x3 ||
					e.clientX - detailsDivPlace.x < x4)
			) {
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
		const videoCutoutSection = document.querySelector('.videoCutoutSection');
		if (videoCutoutSection) {
			const videoCutoutSectionHeight = videoCutoutSection.getBoundingClientRect()
				.top;
			if (videoCutoutSectionHeight <= 0) {
			}
		}
	});
}

export default topnavFunctionality;
