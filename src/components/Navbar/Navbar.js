import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import './navbar.css';

function Navbar() {
	return (
		<div>
			<nav className="navbar">
				<div className="navContainer">
					<Link to="/">
						<h1 className="navHeader">Sola</h1>
					</Link>
				</div>
				<div className="linksContainer">
					<NavLink className="navLink" to="/shop">
						Shop
					</NavLink>
					<NavLink className="navLink" to="/contact">
						Contact
					</NavLink>
					<FiSearch className="searchIcon" />
					<FiShoppingCart className="cartIcon" />
					<NavLink className="navLink" to="/signin">
						Sign In/Register
					</NavLink>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
