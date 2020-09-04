import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import './admin.css';
import './inventory.css';
import { IconContext } from 'react-icons';
import { saveInventory, saveImages } from '../../actions/admin';
import { loadNav } from '../../actions/nav';
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
			addedImages: [],
			showSaved: false,
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
									className="inventoryCardText inventoryCardInput newInventoryInput"
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
									className="inventoryCardText inventoryCardInput newInventoryInput"
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
									className="inventoryCardText inventoryCardInput newInventoryInput"
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
									className="inventoryCardText inventoryCardInput newInventoryInput"
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
									className="inventoryCardText inventoryCardInput newInventoryInput"
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
									className="inventoryCardText inventoryCardInput newInventoryInput"
									onChange={(e) => {
										this.setState({ stock: e.target.value });
									}}
								></input>
							</div>
						</div>
						<div className="inventoryItemTextDiv inventoryCardDescriptionDiv">
							<p className="orderCardUnderlineHeader">Description</p>
							<textarea
								className="inventoryCardDescriptionInput newInventoryInput"
								onChange={(e) => {
									this.setState({ description: e.target.value });
								}}
							></textarea>
						</div>
						<div className="inventoryCardRightDiv">
							<div className="inventoryPopupDiv">
								{this.state.showSaved ? (
									<h2 className="savedPopup">Saved new product!</h2>
								) : null}
								{this.state.showNoChanges ? (
									<h2 className="savedPopup">Complete form before saving.</h2>
								) : null}
							</div>
							<div className="inventoryCardEditRemoveDiv">
								<IconContext.Provider
									value={{ color: '#010620', size: '20px' }}
								>
									<div
										className="orderPanelIconDiv removeIconDiv"
										onClick={() => {
											if (
												this.state.name !== '' &&
												this.state.sku !== '' &&
												this.state.brand !== '' &&
												this.state.category !== '' &&
												this.state.price !== '' &&
												this.state.stock !== '' &&
												this.state.description !== '' &&
												this.state.addedImages.length > 0
											) {
												console.log('Saving this state:');
												console.log(this.state);
												this.props
													.saveInventory(this.state)
													.then(() => {
														console.log('About to save images ');
														console.log(this.state);
														this.props.saveImages(this.state);
													})
													.then(() => this.props.loadNav())
													.then(() => {
														this.setState({
															description: '',
															name: '',
															sku: '',
															category: '',
															price: '',
															stock: '',
															images: '',
															addedImages: [],
															showSaved: true,
															showNoChanges: false,
														});
													});

												const inputs = document.querySelectorAll(
													'.newInventoryInput'
												);
												inputs.forEach((input) => {
													input.value = '';
												});
												setTimeout(() => {
													this.setState({ showSaved: false });
												}, 3000);
											} else {
												this.setState({
													showSaved: false,
													showNoChanges: true,
												});
												setTimeout(() => {
													this.setState({ showNoChanges: false });
												}, 3000);
											}
										}}
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
									<div
										className="inventoryItemImageLine addNewImageTextDiv"
										onClick={(e) => {
											document
												.querySelector('#newProductImageUploadInput')
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
															<div className="imageRemoveBtnContainer">
																<IconContext.Provider
																	value={{ color: '#3066be', size: '12px' }}
																>
																	<AiFillCloseCircle
																		className="removeNewImageIcon"
																		onClick={(e) => {
																			const newAddedImages = this.state.addedImages.filter(
																				(image) => {
																					return (
																						image.imagedetails.name !== key
																					);
																				}
																			);
																			this.setState({
																				...this.state,
																				addedImages: newAddedImages,
																			});
																		}}
																	/>
																</IconContext.Provider>
															</div>

															<p className="inventoryCardText inventoryCardImageTitleText addImageText">
																{image.imagedetails.name}
															</p>
														</div>
													);
												}
										  })
										: null}
								</div>
							</div>
						</div>
					</div>
					<input
						type="file"
						className="imageUploadInput"
						id={'newProductImageUploadInput'}
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
		} else {
			return null;
		}
	}
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
	saveInventory,
	saveImages,
	loadNav,
})(NewInventoryItem);
