import React, { Fragment, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { loadOrders } from '../../actions/admin';
import { connect } from 'react-redux';
import './admin.css';

class Orders extends Component {
	constructor(props) {
		super(props);
		if (this.props.isAdmin) {
			console.log('Starting to load orders');
			loadOrders();
		}
	}

	render() {
		return (
			<Fragment>
				<div className="ordersPanelBody">Orders</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	isAdmin: state.admin.isAdmin,
	orders: state.admin.orders,
});

export default connect(mapStateToProps, { loadOrders })(Orders);
