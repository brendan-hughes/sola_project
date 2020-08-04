import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import './navbar.css';

const activeStyle = { color: '#7d94ba', textDecoration: 'none' };

function Navbar() {
	return (
		<div>
			<nav className="navbar">
				<div className="navContainer">
					<NavLink activeStyle={activeStyle} to="/">
						<h1 className="navHeader">Sola</h1>
					</NavLink>
				</div>
				<NavLink activeStyle={activeStyle} className="navLink" to="/shop">
					Shop
				</NavLink>
				<NavLink activeStyle={activeStyle} className="navLink" to="/contact">
					Contact
				</NavLink>
				<IconContext.Provider value={{ color: '#3066be', size: '50px' }}>
					<FiSearch className="searchIcon" />
				</IconContext.Provider>
				<Link to="/cart">
					<IconContext.Provider value={{ color: '#3066be', size: '50px' }}>
						<FiShoppingCart className="cartIcon" />
					</IconContext.Provider>
				</Link>
				<NavLink activeStyle={activeStyle} className="navLink" to="/signin">
					Sign In/Register
				</NavLink>
			</nav>
		</div>
	);
}

export default Navbar;
