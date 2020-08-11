import React, { Fragment, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './admin.css';

class Inventory extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Fragment>
				<div className="ordersPanelBody">Inventory</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	inventory: state.admin.inventory,
});

export default connect(mapStateToProps)(Inventory);
