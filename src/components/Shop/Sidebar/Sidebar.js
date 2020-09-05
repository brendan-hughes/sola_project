import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillCaretRight } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import './sidebar.css';

function Sidebar() {
	return (
		<Fragment>
			<div className="sidebarContainer">
				<h3 className="viewMenu">Menu</h3>
				<h2 className="sidebarHeading">Shop by Category</h2>
				<NavLink className="sidebarLink" to="/shop/Panels/any">
					Panels
				</NavLink>
				<NavLink className="sidebarLink" to="/shop/Batteries/any">
					Batteries
				</NavLink>
				<NavLink className="sidebarLink" to="/shop/Lights/any">
					Lights
				</NavLink>
				<IconContext.Provider value={{ size: '25px' }}>
					<AiFillCaretRight className="sidebarArrow" />
				</IconContext.Provider>
				<h2 className="sidebarHeading">Shop by Brand</h2>
				<NavLink className="sidebarLink" to="/shop/any/Sola+">
					Sola+
				</NavLink>
				<NavLink className="sidebarLink" to="/shop/any/Green_Bean">
					Green Bean
				</NavLink>
				<NavLink className="sidebarLink" to="/shop/any/Commercial_Tech">
					Commercial Tech
				</NavLink>
				<NavLink className="sidebarLink" to="/shop/any/Martian_Sun">
					Martian Sun
				</NavLink>
				<div className="sidebarHero">
					<p className="sidebarHeroText">Find Store</p>
				</div>
			</div>
		</Fragment>
	);
}

export default Sidebar;
