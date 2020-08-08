import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { IconContext } from 'react-icons';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { loadCart } from '../../actions/cart';
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
							to="/shop/Panels/any"
						>
							Shop
						</NavLink>
						<div className="navDetails shopDetails">
							<p className="navDetailLink navDetailHeading">Categories</p>
							<Link
								to="/shop/Panels/any"
								className="navDetailLink navDetailOption"
							>
								Panels
							</Link>
							<Link
								to="/shop/Batteries/any"
								className="navDetailLink navDetailOption"
							>
								Batteries
							</Link>
							<Link
								to="/shop/Lights/any"
								className="navDetailLink navDetailOption"
							>
								Lights
							</Link>
							<Link
								to="/shop/any/any"
								className="navDetailLink navDetailOption"
							>
								All Products
							</Link>
							<p className="navDetailLink navDetailHeading">Brands</p>
							<Link
								to="/shop/any/Sola+"
								className="navDetailLink navDetailOption"
							>
								Sola+
							</Link>
							<Link
								to="/shop/any/Green_Bean"
								className="navDetailLink navDetailOption"
							>
								Green Bean
							</Link>
							<Link
								to="/shop/any/Commercial_Tech"
								className="navDetailLink navDetailOption"
							>
								Commercial Tech
							</Link>
							<Link
								to="/shop/any/Martian_Sun"
								className="navDetailLink navDetailOption"
							>
								Martian Sun
							</Link>
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
					<div className="cartDiv">
						<p className="cartQuantityText">{this.props.cartQuantity}</p>
						<Link to="/cart">
							<IconContext.Provider value={{ color: '#3066be', size: '50px' }}>
								<FiShoppingCart className="cartIcon" />
							</IconContext.Provider>
						</Link>
					</div>

					<div className="searchBar">
						<input
							className="searchBarInput"
							type="text"
							placeholder="Search Sola"
						></input>
						<div className="searchIconDiv">
							<IconContext.Provider value={{ color: '#3066be', size: '50px' }}>
								<FiSearch className="searchIcon" />
							</IconContext.Provider>
						</div>
					</div>

					{this.props.isAuthenticated ? (
						<div
							className="navLink hvr-underline-from-center signOutButton"
							onClick={this.props.logout}
						>
							Sign Out
						</div>
					) : (
						<NavLink
							activeStyle={activeStyle}
							className="navLink hvr-underline-from-center signRegister"
							activeClassName="act-underline-from-center"
							to="/signin"
						>
							Sign In/Register
						</NavLink>
					)}
				</nav>
			</div>
		);
	}
}

Navbar.propTypes = {
	logout: PropTypes.func.isRequired,
	cartQuantity: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	cartContents: state.cart.contents,
	cartQuantity: state.cart.totalQuantity,
	cartSubtotal: state.cart.subTotal,
	cartTotal: state.cart.totalPrice,
});

export default connect(mapStateToProps, { logout, loadCart })(Navbar);
