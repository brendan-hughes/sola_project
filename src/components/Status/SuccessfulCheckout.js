import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { orderSuccess } from '../../actions/cart';
import './successfulcheckout.css';

class SuccessfulCheckout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orderID: localStorage.getItem('cartToken'),
		};
		localStorage.removeItem('cartToken');
	}

	componentDidMount() {
		this.props.orderSuccess();
	}

	render() {
		return (
			<Fragment>
				<section className="checkoutSuccessSection">
					<h1>Your order has been received.</h1>
					<h3>Please keep track of your order number: #{this.state.orderID}</h3>
				</section>
			</Fragment>
		);
	}
}

export default connect(null, { orderSuccess })(SuccessfulCheckout);
