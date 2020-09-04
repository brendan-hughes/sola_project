import React, { Fragment, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Orders from './Orders';
import Inventory from './Inventory';
import { connect } from 'react-redux';
import { loadOrders } from '../../actions/admin';
import './admin.css';

import TagManager from 'react-gtm-module';

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			togglePanel: 'Orders',
			loading: false,
		};
		TagManager.dataLayer({
			dataLayer: {
				page: 'admin',
			},
		});
	}

	render() {
		if (this.props.isAdmin === false) {
			return <Redirect to="/" />;
		} else {
			return (
				<Fragment>
					<section className="adminSection">
						<div className="ordersPanel">
							<div className="ordersPanelNav">
								<div
									className={
										this.state.togglePanel === 'Orders'
											? 'panelNavButton panelNavActive'
											: 'panelNavButton panelNavInactive'
									}
									onClick={() => {
										if (this.state.togglePanel === 'Inventory') {
											this.setState({ togglePanel: 'Orders' });
										}
									}}
								>
									<p
										className={
											this.state.togglePanel === 'Orders'
												? 'panelNavHeader panelNavHeaderActive'
												: 'panelNavHeader panelNavHeaderInactive'
										}
									>
										Orders
									</p>
								</div>
								<div
									className={
										this.state.togglePanel === 'Inventory'
											? 'panelNavButton panelNavActive'
											: 'panelNavButton panelNavInactive'
									}
									onClick={() => {
										if (this.state.togglePanel === 'Orders') {
											this.setState({ togglePanel: 'Inventory' });
										}
									}}
								>
									<p
										className={
											this.state.togglePanel === 'Inventory'
												? 'panelNavHeader panelNavHeaderActive'
												: 'panelNavHeader panelNavHeaderInactive'
										}
									>
										Inventory
									</p>
								</div>
							</div>
							{this.state.togglePanel === 'Orders' ? <Orders /> : <Inventory />}
						</div>
					</section>
				</Fragment>
			);
		}
	}
}

const mapStateToProps = (state) => ({
	isAdmin: state.admin.isAdmin,
});

export default connect(mapStateToProps, { loadOrders })(Admin);
