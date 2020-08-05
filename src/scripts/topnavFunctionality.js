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
		370,
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
		const detailsDivPlace = navLink.getBoundingClientRect();
		// console.log(e.clientY - detailsDivPlace.y);
		// console.log(e.clientX - detailsDivPlace.x);

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
