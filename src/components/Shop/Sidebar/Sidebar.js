import React, { Fragment, Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AiFillCaretRight } from 'react-icons/ai';
import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import './sidebar.css';

class Sidebar extends Component {
	render() {
		if (window.innerWidth > 500) {
			return (
				<Fragment>
					<div className="sidebarContainer">
						<h3 className="viewMenu">Menu</h3>
						<h2 className="sidebarHeading">Shop by Category</h2>
						{this.props.categoriesList !== null
							? this.props.categoriesList.map((category) => (
									<Link
										key={category}
										to={'/shop/' + category.replace(' ', '_') + '/any'}
										className="sidebarLink"
									>
										{category}
									</Link>
							  ))
							: null}
						<IconContext.Provider value={{ size: '25px' }}>
							<AiFillCaretRight className="sidebarArrow" />
						</IconContext.Provider>
						<h2 className="sidebarHeading">Shop by Brand</h2>
						{this.props.brandList !== null
							? this.props.brandList.map((brand) => (
									<NavLink
										key={brand}
										to={'/shop/any/' + brand.replace(' ', '_')}
										className="sidebarLink"
									>
										{brand}
									</NavLink>
							  ))
							: null}

						<Link to="/findstore" className="sidebarHero">
							<p className="sidebarHeroSubtext">Need help selecting?</p>
							<p className="sidebarHeroText">Visit Us In Store</p>
						</Link>
					</div>
				</Fragment>
			);
		}
	}
}

const mapStateToProps = (state) => ({
	categoriesList: state.nav.categoriesList,
	brandList: state.nav.brandList,
});

export default connect(mapStateToProps)(Sidebar);
