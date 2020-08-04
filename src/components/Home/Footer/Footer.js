import React, { Fragment } from 'react';
import './footer.css';

function Footer() {
	return (
		<Fragment>
			<footer>
				<div className="upperFooter">
					<div className="leftUpperFooter">
						<p>Shop</p>
						<p>Contact</p>
						<p>Search</p>
						<p>Sign In/Register</p>
					</div>
					<div className="middleUpperFooter">
						<p>Panels</p>
						<p>Batteries</p>
						<p>Lights</p>
						<p>Find A Store</p>
					</div>
					<div className="rightUpperFooter">
						<p>Newsletter</p>
						<input type="text" placeholder="Type your email..." />
					</div>
				</div>
				<div className="lowerFooter">
					<p>Developed by Brendan Hughes (2020)</p>
				</div>
			</footer>
		</Fragment>
	);
}

export default Footer;
