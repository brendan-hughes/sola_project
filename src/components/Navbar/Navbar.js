import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import './navbar.css';
import topnavFunctionality from '../../scripts/topnavFunctionality';

const activeStyle = { color: '#7d94ba', textDecoration: 'none' };

class Navbar extends Component {
	componentDidMount() {
		topnavFunctionality();
	}

	render() {
		return (
			<div>
				<nav className="navbar">
					<div className="navContainer">
						<NavLink activeStyle={activeStyle} to="/">
							<h1 className="navHeader">Sola</h1>
						</NavLink>
					</div>
					<div>
						<NavLink
							activeStyle={activeStyle}
							className="navLink hvr-underline-from-center shopNavLink"
							activeClassName="act-underline-from-center"
							to="/shop"
						>
							Shop
						</NavLink>
						<div className="navDetails shopDetails">
							<p className="navDetailLink navDetailHeading">Shop By Category</p>
							<p className="navDetailLink navDetailOption">Panels</p>
							<p className="navDetailLink navDetailOption">Batteries</p>
							<p className="navDetailLink navDetailOption">Lights</p>
							<p className="navDetailLink navDetailHeading">Shop by Brand</p>
							<p className="navDetailLink navDetailOption">Sola+</p>
							<p className="navDetailLink navDetailOption">Green Bean</p>
							<p className="navDetailLink navDetailOption">Commercial Tech</p>
							<p className="navDetailLink navDetailOption">Martian Soil</p>
						</div>
					</div>
					<div>
						<NavLink
							activeStyle={activeStyle}
							className="navLink hvr-underline-from-center contactNavLink"
							activeClassName="act-underline-from-center"
							to="/contact"
						>
							Contact
						</NavLink>
						<div className="navDetails contactDetails">
							<Link to="/contact" className="navDetailLink navDetailOption">
								Email
							</Link>
							<Link to="/findstore" className="navDetailLink navDetailOption">
								Find Store
							</Link>
						</div>
					</div>
					<IconContext.Provider value={{ color: '#3066be', size: '50px' }}>
						<FiSearch className="searchIcon" />
						{/* <input type="text" placeholder="Search Sola"></input> */}
					</IconContext.Provider>
					<Link to="/cart">
						<IconContext.Provider value={{ color: '#3066be', size: '50px' }}>
							<FiShoppingCart className="cartIcon" />
						</IconContext.Provider>
					</Link>
					<NavLink
						activeStyle={activeStyle}
						className="navLink hvr-underline-from-center"
						activeClassName="act-underline-from-center"
						to="/signin"
					>
						Sign In/Register
					</NavLink>
				</nav>
			</div>
		);
	}
}

export default Navbar;
