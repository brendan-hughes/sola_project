import React, { Fragment, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import OrderItem from './OrderItem';
import { loadOrders } from '../../actions/admin';
import { connect } from 'react-redux';
import './admin.css';

class Orders extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
		if (this.props.isAdmin) {
			console.log('Starting to load orders');
			this.props.loadOrders().then(() => {
				this.setState({
					...this.state,
					loading: false,
				});
			});
		}
	}

	render() {
		return (
			<Fragment>
				{this.state.loading === true ? (
					<div className="ordersPanelBody">
						<div className="loader"></div>
					</div>
				) : (
					<div className="ordersPanelBody">
						{this.props.orders.length > 0 ? (
							this.props.orders.map((order) => (
								<OrderItem
									key={order.number}
									orderNumber={order.cart.cartToken}
									cartContents={order.cart.contents}
									totalQuantity={order.cart.totalQuantity}
									totalPrice={order.cart.totalPrice}
									customerName={order.customer.name}
									customerAddress={order.customer.address}
									date={order.date}
									status={order.status}
									orderNotes={order.orderNotes}
								/>
							))
						) : (
							<h2 className="centerStatusText">No orders to display.</h2>
						)}
					</div>
				)}
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	isAdmin: state.admin.isAdmin,
	orders: state.admin.orders,
});

export default connect(mapStateToProps, { loadOrders })(Orders);
