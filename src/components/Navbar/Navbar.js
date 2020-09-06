import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import ChatBubble from './ChatBubble';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { loadCart } from '../../actions/cart';
import {
	loadNav,
	searchProducts,
	removeSearchProducts,
} from '../../actions/nav';
import './navbar.css';
import topnavFunctionality from '../../scripts/topnavFunctionality';
import TagManager from 'react-gtm-module';

const activeStyle = { color: '#7d94ba', textDecoration: 'none' };

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: '',
			searchLoading: false,
		};
	}
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
					<div className="searchBarContainer">
						<div className="searchBar navIcon">
							<input
								className="searchBarInput"
								type="text"
								placeholder="Search Sola"
								onBlur={(e) => {
									const displaySearchBar = document.querySelector(
										'.displaySearchBar'
									);
									setTimeout(() => {
										displaySearchBar.classList.remove('activeSearchBar');
										this.props.removeSearchProducts();
									}, 1000);
								}}
								onChange={(e) => {
									const displaySearchBar = document.querySelector(
										'.displaySearchBar'
									);
									displaySearchBar.classList.add('activeSearchBar');
									this.setState({
										searchLoading: true,
									});
									this.props.searchProducts(e.target.value).then(() => {
										this.setState({
											searchLoading: false,
										});
									});
								}}
							></input>
							<div className="searchIconDiv">
								<IconContext.Provider
									value={{ color: '#3066be', size: '50px' }}
								>
									<FiSearch className="searchIcon" />
								</IconContext.Provider>
							</div>
						</div>
						<div className="displaySearchBar">
							<div className="searchResultsContainer">
								{this.state.searchLoading ? (
									<div className="searchResultsContainer">
										<div className="searchLoading"></div>
									</div>
								) : this.props.searchResults !== undefined ? (
									this.props.searchResults.map((result) => {
										return (
											<Link
												className="searchResultCardLink"
												to={`/product/${result.sku}`}
											>
												<div className="searchResultCard">
													<div className="searchResultCardLeft">
														<p className="searchResultName">{result.name}</p>
														<p className="searchResultBrand">{result.brand}</p>
													</div>
													<div className="searchResultCardRight">
														<p className="searchResultPrice">${result.price}</p>
													</div>
												</div>
											</Link>
										);
									})
								) : null}
							</div>
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
				<ChatBubble />
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
	searchResults: state.nav.searchResults,
});

export default connect(mapStateToProps, {
	logout,
	loadCart,
	loadNav,
	searchProducts,
	removeSearchProducts,
})(Navbar);
