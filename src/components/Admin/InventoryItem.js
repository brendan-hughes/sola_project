import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import './admin.css';
import './inventory.css';
import { IconContext } from 'react-icons';
import { FaSave } from 'react-icons/fa';
import { AiFillCloseCircle, AiFillPlusCircle } from 'react-icons/ai';
import { saveInventory, saveImages } from '../../actions/admin';
import { loadNav } from '../../actions/nav';

class InventoryItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: this.props.description,
			name: this.props.name,
			brand: this.props.brand,
			sku: this.props.sku,
			category: this.props.category,
			price: this.props.price,
			stock: this.props.stock,
			images: this.props.images,
			addedImages: [],
			showSaved: false,
			showNoChanges: false,
			removed: false,
		};
	}

	render() {
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
								defaultValue={this.props.name}
								className="inventoryCardText inventoryCardInput"
								onChange={(e) => {
									this.setState({ name: e.target.value });
								}}
							></input>
						</div>
						<div className="inventoryItemTextDiv">
							<p className="inventoryCardHeader">SKU:</p>
							<input
								type="text"
								name="sku"
								defaultValue={this.props.sku}
								className="inventoryCardText inventoryCardInput"
								onChange={(e) => {
									this.setState({ sku: e.target.value });
								}}
							></input>
						</div>
						<div className="inventoryItemTextDiv">
							<p className="inventoryCardHeader">Brand:</p>
							<input
								type="text"
								name="brand"
								defaultValue={this.props.brand}
								className="inventoryCardText inventoryCardInput"
								onChange={(e) => {
									this.setState({ brand: e.target.value });
								}}
							></input>
						</div>
						<div className="inventoryItemTextDiv">
							<p className="inventoryCardHeader">Category:</p>
							<input
								type="text"
								name="category"
								defaultValue={this.props.category}
								className="inventoryCardText inventoryCardInput"
								onChange={(e) => {
									this.setState({ category: e.target.value });
								}}
							></input>
						</div>
						<div className="inventoryItemTextDiv">
							<p className="inventoryCardHeader ">Price:</p>
							<input
								type="text"
								name="price"
								defaultValue={this.props.price}
								className="inventoryCardText inventoryCardInput"
								onChange={(e) => {
									this.setState({ price: e.target.value });
								}}
							></input>
						</div>
						<div className="inventoryItemTextDiv">
							<p className="inventoryCardHeader">Current Stock:</p>
							<input
								type="text"
								name="stock"
								defaultValue={
									this.props.stock === undefined ? '0' : this.props.stock
								}
								className="inventoryCardText inventoryCardInput"
								onChange={(e) => {
									this.setState({ stock: e.target.value });
								}}
							></input>
						</div>
					</div>
					<div className="inventoryItemTextDiv inventoryCardDescriptionDiv">
						<p className="orderCardUnderlineHeader">Description</p>
						<textarea
							className="inventoryCardDescriptionInput"
							defaultValue={this.props.description}
							onChange={(e) => {
								this.setState({ description: e.target.value });
							}}
						></textarea>
					</div>
					<div className="inventoryCardRightDiv">
						<div className="inventoryPopupDiv">
							{this.state.showSaved ? (
								<h2 className="savedPopup">Saved!</h2>
							) : null}
							{this.state.showNoChanges ? (
								<h2 className="savedPopup">No changes to save.</h2>
							) : null}
						</div>
						<div className="inventoryCardEditRemoveDiv">
							<IconContext.Provider value={{ color: '#010620', size: '20px' }}>
								<div
									className="orderPanelIconDiv removeIconDiv"
									onClick={() => {
										this.props.saveImages(this.state);
										// if (
										// 	this.state.name !== this.props.name ||
										// 	this.state.sku !== this.props.sku ||
										// 	this.state.brand !== this.props.brand ||
										// 	this.state.category !== this.props.category ||
										// 	this.state.price !== this.props.price ||
										// 	this.state.stock !== this.props.stock ||
										// 	this.state.description !== this.props.description ||
										// 	this.state.addedImages.length > 0
										// ) {
										// 	this.props
										// 		.saveInventory(this.state)
										// 		.then(() => this.props.loadNav());
										// 	this.setState({
										// 		showSaved: true,
										// 		showNoChanges: false,
										// 	});
										// 	setTimeout(() => {
										// 		this.setState({ showSaved: false });
										// 	}, 3000);
										// } else {
										// 	this.setState({
										// 		showSaved: false,
										// 		showNoChanges: true,
										// 	});
										// 	setTimeout(() => {
										// 		this.setState({ showNoChanges: false });
										// 	}, 3000);
										// }
									}}
								>
									<FaSave className="removeIcon" />
									<p className="smallIconText">Save</p>
								</div>
							</IconContext.Provider>
							<IconContext.Provider value={{ color: '#010620', size: '20px' }}>
								<div
									className="orderPanelIconDiv removeIconDiv"
									onClick={() => {}}
								>
									<AiFillCloseCircle className="removeIcon" />
									<p className="smallIconText">Remove</p>
								</div>
							</IconContext.Provider>
						</div>
						<div className="inventoryItemTextDiv inventoryItemImagesDiv">
							<p className="orderCardUnderlineHeader">Images</p>

							<div className="inventoryItemImagesTable">
								<div
									className="inventoryItemImageLine addNewImageTextDiv"
									onClick={(e) => {
										document
											.querySelector('#imageUploadInput' + this.props.sku)
											.click();
									}}
								>
									<IconContext.Provider
										value={{ color: '#3066be', size: '12px' }}
									>
										<AiFillPlusCircle />
									</IconContext.Provider>
									<p className="inventoryCardText inventoryCardImageTitleText addImageText">
										Add New Image
									</p>
								</div>
								{this.state.addedImages.length !== 0
									? this.state.addedImages.map((image) => {
											if (image.product === this.props.sku) {
												const key = image.imagedetails.name;
												return (
													<div
														key={this.props.sku + image.imagedetails.name}
														value={image.name}
														className="inventoryItemImageLine addNewImageTextDiv addedImageTextDiv"
													>
														<IconContext.Provider
															value={{ color: '#3066be', size: '12px' }}
														>
															<AiFillCloseCircle
																className="removeNewImageIcon"
																onClick={(e) => {
																	const newAddedImages = this.state.addedImages.filter(
																		(image) => {
																			return image.imagedetails.name !== key;
																		}
																	);
																	this.setState({
																		...this.state,
																		addedImages: newAddedImages,
																	});
																}}
															/>
														</IconContext.Provider>
														<p className="inventoryCardText inventoryCardImageTitleText addImageText">
															{image.imagedetails.name}
														</p>
													</div>
												);
											}
									  })
									: null}
								{this.props.images !== null
									? this.props.images.map((image) => (
											<div
												key={this.props.sku + image.imagedetails.name}
												className="inventoryItemImageLine addNewImageTextDiv addedImageTextDiv"
											>
												<IconContext.Provider
													value={{ color: '#3066be', size: '12px' }}
												>
													<AiFillCloseCircle className="removeNewImageIcon" />
												</IconContext.Provider>
												<p className="inventoryCardText inventoryCardImageTitleText addImageText">
													{image.imagedetails.name}
												</p>
											</div>
									  ))
									: null}
							</div>
						</div>
					</div>
				</div>
				<input
					type="file"
					className="imageUploadInput"
					id={'imageUploadInput' + this.props.sku}
					onChange={(e) => {
						const currentList = this.state.addedImages;
						currentList.push({
							imagedetails: e.target.files[0],
							product: this.props.sku,
						});
						this.setState({
							...this.state,
							addedImages: [...currentList],
						});
						e.target.value = null;
					}}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { saveInventory, loadNav, saveImages })(
	InventoryItem
);
