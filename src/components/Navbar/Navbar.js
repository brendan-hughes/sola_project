import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { IconContext } from 'react-icons';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { loadCart } from '../../actions/cart';
import { loadNav } from '../../actions/nav';
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
							<h1 className="navHeader navLink">Sola</h1>
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
							{this.props.categoriesList !== null
								? this.props.categoriesList.map((category) => (
										<Link
											key={category}
											to={'/shop/' + category.replace(' ', '_') + '/any'}
											className="navDetailLink navDetailOption"
										>
											{category}
										</Link>
								  ))
								: null}
							<Link
								to="/shop/any/any"
								className="navDetailLink navDetailOption"
							>
								All Products
							</Link>
							<p className="navDetailLink navDetailHeading navDetailSecondHeading">
								Brands
							</p>
							{this.props.categoriesList !== null
								? this.props.brandList.map((brand) => (
										<Link
											key={brand}
											to={'/shop/any/' + brand.replace(' ', '_')}
											className="navDetailLink navDetailOption"
										>
											{brand}
										</Link>
								  ))
								: null}
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

					<div className="searchBar navIcon">
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
					<div className="cartDiv navIcon">
						<p className="cartQuantityText navIcon">
							{this.props.cartQuantity}
						</p>
						<Link to="/cart">
							<IconContext.Provider value={{ color: '#3066be', size: '50px' }}>
								<FiShoppingCart className="cartIcon" />
							</IconContext.Provider>
						</Link>
					</div>
					{this.props.isAdmin ? (
						<NavLink
							activeStyle={activeStyle}
							className="navLink hvr-underline-from-center signRegister"
							activeClassName="act-underline-from-center"
							to="/admin"
						>
							Admin
						</NavLink>
					) : null}
					{this.props.isAuthenticated ? (
						<div
							className="navLink hvr-underline-from-center signOutButton signRegister"
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
	categoriesList: state.nav.categoriesList,
	brandList: state.nav.brandList,
	isAdmin: state.admin.isAdmin,
});

export default connect(mapStateToProps, { logout, loadCart, loadNav })(Navbar);
