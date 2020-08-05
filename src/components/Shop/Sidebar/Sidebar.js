import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillCaretRight } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import './sidebar.css';

function Sidebar() {
	return (
		<Fragment>
			<div className="sidebarContainer">
				<h3 className="viewMenu">View Menu</h3>
				<h2 className="sidebarHeading">Shop by Category</h2>
				<NavLink className="sidebarLink" to="/">
					Panels
				</NavLink>
				<NavLink className="sidebarLink" to="/">
					Batteries
				</NavLink>
				<NavLink className="sidebarLink" to="/">
					Lights
				</NavLink>
				<IconContext.Provider value={{ size: '50px' }}>
					<AiFillCaretRight className="sidebarArrow" />
				</IconContext.Provider>
				<h2 className="sidebarHeading">Shop by Brand</h2>
				<NavLink className="sidebarLink" to="/">
					Sola+
				</NavLink>
				<NavLink className="sidebarLink" to="/">
					Green Bean
				</NavLink>
				<NavLink className="sidebarLink" to="/">
					Commercial Tech
				</NavLink>
				<NavLink className="sidebarLink" to="/">
					Martian Soil
				</NavLink>
			</div>
		</Fragment>
	);
}

export default Sidebar;
