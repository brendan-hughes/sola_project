import React, { Fragment } from 'react';
import './footer.css';

function Footer() {
	return (
		<Fragment>
			<footer>
				<div className="upperFooter">
					<div className="leftUpperFooter">
						<p className="footerLink">Shop</p>
						<p className="footerLink">Contact</p>
						<p className="footerLink">Search</p>
						<p className="footerLink">Sign In/Register</p>
					</div>
					<div className="middleUpperFooter">
						<p className="footerLink">Panels</p>
						<p className="footerLink">Batteries</p>
						<p className="footerLink">Lights</p>
						<p className="footerLink">Find A Store</p>
					</div>
					<div className="rightUpperFooter">
						<p className="footerLink">Newsletter</p>
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
