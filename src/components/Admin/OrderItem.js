import React, { Fragment, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaSave } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { editOrders, removeOrder } from '../../actions/admin';
import './admin.css';

class OrderItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentNotes: this.props.orderNotes,
			status: this.props.status,
			showSaved: false,
			showNoChanges: false,
			removed: false,
		};
	}

	render() {
		if (this.state.removed === false) {
			return (
				<div className="orderItemCard">
					<div className="orderCardTopRow">
						<div className="orderCardRowContainer">
							<h2 className="orderCardUnderlineHeader">Order Details</h2>
							<div className="orderCardTextContainer">
								{' '}
								<h2 className="orderCardHeader">Date:</h2>{' '}
								<p className="orderCardText">
									{this.props.date.substring(0, 10)}
								</p>
							</div>
							<div className="orderCardTextContainer">
								{' '}
								<h2 className="orderCardHeader">ID:</h2>{' '}
								<p className="orderCardText">{this.props.orderNumber}</p>
							</div>
							<div className="orderCardTextContainer">
								{' '}
								<h2 className="orderCardHeader">Status:</h2>{' '}
								{this.props.status === 'Pending' ? (
									<select
										className="orderStatusDropdown"
										onChange={(e) => {
											this.setState({ status: e.target.value });
											console.log(e.target.value);
										}}
									>
										<option className="orderCardText " value="Pending" selected>
											Pending
										</option>
										<option className="orderCardText" value="Shipped">
											Shipped
										</option>
										<option className="orderCardText" value="Fulfilled">
											Fulfilled
										</option>
										<option className="orderCardText" value="Issue">
											Issue
										</option>
									</select>
								) : this.props.status === 'Shipped' ? (
									<select
										className="orderStatusDropdown"
										onChange={(e) => {
											this.setState({ status: e.target.value });
										}}
									>
										<option className="orderCardText" value="Pending">
											Pending
										</option>
										<option className="orderCardText" value="Shipped" selected>
											Shipped
										</option>
										<option className="orderCardText" value="Fulfilled">
											Fulfilled
										</option>
										<option className="orderCardText" value="Issue">
											Issue
										</option>
									</select>
								) : this.props.status === 'Fulfilled' ? (
									<select
										className="orderStatusDropdown"
										onChange={(e) => {
											this.setState({ status: e.target.value });
										}}
									>
										<option className="orderCardText" value="Pending">
											Pending
										</option>
										<option className="orderCardText" value="Shipped">
											Shipped
										</option>
										<option
											className="orderCardText"
											value="Fulfilled"
											selected
										>
											Fulfilled
										</option>
										<option className="orderCardText" value="Issue">
											Issue
										</option>
									</select>
								) : (
									<select
										className="orderStatusDropdown"
										onChange={(e) => {
											this.setState({ status: e.target.value });
											console.log(e.target.value);
										}}
									>
										<option className="orderCardText" value="Pending">
											Pending
										</option>
										<option className="orderCardText" value="Shipped">
											Shipped
										</option>
										<option className="orderCardText" value="Fulfilled">
											Fulfilled
										</option>
										<option className="orderCardText" value="Issue" selected>
											Issue
										</option>
									</select>
								)}
							</div>
							<div className="orderCardTextContainer">
								{' '}
								<h2 className="orderCardHeader">Total:</h2>{' '}
								<p className="orderCardText">
									${this.props.totalPrice.toFixed(2)}
								</p>
							</div>
						</div>
						<div className="savedPopupDiv">
							{this.state.showSaved ? (
								<h2 className="savedPopup">Saved!</h2>
							) : null}
							{this.state.showNoChanges ? (
								<h2 className="savedPopup">No changes to save.</h2>
							) : null}
						</div>

						<div className="orderCardEditContainer">
							<IconContext.Provider value={{ color: '#010620', size: '20px' }}>
								<div
									className="orderPanelIconDiv saveIconDiv"
									onClick={() => {
										if (
											this.state.status !== this.props.status ||
											this.state.currentNotes !== this.props.orderNotes
										) {
											this.props.editOrders(
												this.props.orderNumber,
												this.state.status,
												this.state.currentNotes
											);
											this.setState({
												currentNotes: this.props.orderNotes,
												status: this.props.status,
												showSaved: true,
												showNoChanges: false,
											});
											setTimeout(() => {
												this.setState({ ...this.state, showSaved: false });
											}, 3000);
										} else {
											this.setState({
												...this.state,
												showNoChanges: true,
												showSaved: false,
											});
											setTimeout(() => {
												this.setState({ ...this.state, showNoChanges: false });
											}, 3000);
										}
									}}
								>
									<FaSave className="saveIcon" />
									<p className="smallIconText">Save</p>
								</div>
							</IconContext.Provider>
							<IconContext.Provider value={{ color: '#010620', size: '20px' }}>
								<div
									className="orderPanelIconDiv removeIconDiv"
									onClick={() => {
										this.props.removeOrder(this.props.orderNumber);
										this.setState({
											removed: true,
										});
									}}
								>
									<AiFillCloseCircle className="removeIcon" />
									<p className="smallIconText">Remove</p>
								</div>
							</IconContext.Provider>
						</div>
					</div>
					<div className="orderCardBottomRow">
						<div className="orderCardCustomerDetails">
							<h2 className="orderCardUnderlineHeader">Customer Details</h2>
							<div className="orderCardTextContainer">
								{' '}
								<h2 className="orderCardHeader">Name:</h2>{' '}
								<p className="orderCardText">{this.props.customerName}</p>
							</div>
							<div className="orderCardTextContainer">
								{' '}
								<h2 className="orderCardHeader">Billing Address:</h2>{' '}
								<p className="orderCardText">{this.props.customerAddress}</p>
							</div>
						</div>
						<div className="orderCardCartDetails">
							<h2 className="orderCardUnderlineHeader">Order Contents</h2>
							{this.props.cartContents.map((item) => (
								<div className="orderCardTextContainer">
									{' '}
									<h2 className="orderCardHeader">{item.quantity} x</h2>{' '}
									<p className="orderCardText">{item.product.name}</p>
								</div>
							))}
						</div>
						<div className="orderCardNotesDiv">
							<h2 className="orderCardUnderlineHeader">Notes:</h2>
							<textarea
								className="orderCardNotes"
								defaultValue={this.props.orderNotes}
								onChange={(e) => {
									this.setState({ currentNotes: e.target.value });
								}}
							></textarea>
						</div>
					</div>
				</div>
			);
		} else {
			return <div></div>;
		}
	}
}

export default connect(null, { editOrders, removeOrder })(OrderItem);
