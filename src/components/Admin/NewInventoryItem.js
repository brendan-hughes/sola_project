import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import './admin.css';
import './inventory.css';
import { IconContext } from 'react-icons';
import { FaSave } from 'react-icons/fa';
import { AiFillCloseCircle, AiFillPlusCircle } from 'react-icons/ai';

class NewInventoryItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			name: '',
			sku: '',
			category: '',
			price: '',
			stock: '',
			images: '',
			showNoChanges: false,
			removed: false,
		};
	}

	render() {
		if (this.props.removed !== true) {
			return (
				<Fragment>
					<div className="inventoryItemCard">
						<div className="inventoryItemLeftDiv">
							<p className="orderCardUnderlineHeader">Product Details</p>
							<div className="inventoryItemTextDiv">
								<p className="inventoryCardHeader">Name:</p>
								<input
									type="text"
									name="name"
									className="inventoryCardText inventoryCardInput"
								></input>
							</div>
							<div className="inventoryItemTextDiv">
								<p className="inventoryCardHeader">SKU:</p>
								<input
									type="text"
									name="sku"
									className="inventoryCardText inventoryCardInput"
								></input>
							</div>
							<div className="inventoryItemTextDiv">
								<p className="inventoryCardHeader">Brand:</p>
								<input
									type="text"
									name="brand"
									className="inventoryCardText inventoryCardInput"
								></input>
							</div>
							<div className="inventoryItemTextDiv">
								<p className="inventoryCardHeader">Category:</p>
								<input
									type="text"
									name="category"
									className="inventoryCardText inventoryCardInput"
								></input>
							</div>
							<div className="inventoryItemTextDiv">
								<p className="inventoryCardHeader ">Price:</p>
								<input
									type="text"
									name="price"
									className="inventoryCardText inventoryCardInput"
								></input>
							</div>
							<div className="inventoryItemTextDiv">
								<p className="inventoryCardHeader">Current Stock:</p>
								<input
									type="text"
									name="stock"
									className="inventoryCardText inventoryCardInput"
								></input>
							</div>
						</div>
						<div className="inventoryItemTextDiv inventoryCardDescriptionDiv">
							<p className="orderCardUnderlineHeader">Description</p>
							<textarea className="inventoryCardDescriptionInput"></textarea>
						</div>
						<div className="inventoryCardRightDiv">
							<div className="inventoryCardEditRemoveDiv">
								<IconContext.Provider
									value={{ color: '#010620', size: '20px' }}
								>
									<div
										className="orderPanelIconDiv removeIconDiv"
										onClick={() => {}}
									>
										<FaSave className="removeIcon" />
										<p className="smallIconText">Save</p>
									</div>
								</IconContext.Provider>
								<IconContext.Provider
									value={{ color: '#010620', size: '20px' }}
								>
									<div
										className="orderPanelIconDiv removeIconDiv"
										onClick={() => this.props.changeMethod(true)}
									>
										<AiFillCloseCircle className="removeIcon" />
										<p className="smallIconText">Remove</p>
									</div>
								</IconContext.Provider>
							</div>
							<div className="inventoryItemTextDiv inventoryItemImagesDiv">
								<p className="orderCardUnderlineHeader">Images</p>

								<div className="inventoryItemImagesTable">
									<div className="inventoryItemImageLine addNewImageTextDiv">
										<IconContext.Provider
											value={{ color: '#3066be', size: '12px' }}
										>
											<AiFillPlusCircle />
										</IconContext.Provider>
										<p className="inventoryCardText inventoryCardImageTitleText addImageText">
											Add New Image
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Fragment>
			);
		} else {
			return null;
		}
	}
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(NewInventoryItem);
