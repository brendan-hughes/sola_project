import React, { Fragment, Component } from 'react';
import InventoryItem from './InventoryItem';
import NewInventoryItem from './NewInventoryItem';
import { loadInventory } from '../../actions/admin';
import { Link, Redirect } from 'react-router-dom';
import { FaSave } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { AiFillCloseCircle, AiFillPlusCircle } from 'react-icons/ai';
import { connect } from 'react-redux';
import './admin.css';
import './inventory.css';

class Inventory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			removeNewInventoryItem: true,
		};
		this.handleChange = this.handleChange.bind(this);
		if (this.props.isAdmin) {
			this.props.loadInventory().then(() => {
				this.setState({
					...this.state,
					loading: false,
				});
			});
		}
	}

	handleChange(status) {
		this.setState({ removeNewInventoryItem: status });
	}

	render() {
		return (
			<Fragment>
				<div className="inventoryPanelBody">
					<div className="inventoryAddProductButtonDiv">
						<div
							className="inventoryAddProductButton"
							onClick={(e) => {
								this.setState({
									...this.state,
									removeNewInventoryItem: false,
								});
							}}
						>
							<IconContext.Provider value={{ color: '#010620', size: '20px' }}>
								<AiFillPlusCircle />
							</IconContext.Provider>
							<p className="inventoryAddProductButtonText">Add New Product</p>
						</div>
					</div>
					<NewInventoryItem
						removed={this.state.removeNewInventoryItem}
						changeMethod={this.handleChange}
					/>
					{this.props.inventory.map((product) => (
						<InventoryItem
							name={product.name}
							sku={product.sku}
							brand={product.brand}
							category={product.category}
							description={product.description}
							images={product.images}
							currentStock={product.stock}
							price={product.price}
						/>
					))}
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	isAdmin: state.admin.isAdmin,
	inventory: state.admin.inventory,
});

export default connect(mapStateToProps, { loadInventory })(Inventory);
