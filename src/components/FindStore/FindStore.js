import React, { Fragment, Component } from 'react';
import './findstore.css';

class FindStore extends Component {
	render() {
		return (
			<Fragment>
				<section className="findStoreSection">
					<div className="findStoreMapArea"></div>
					<div className="findStoreSearchArea">
						<h1 className="findStoreHeader">
							Find <span className="colorize">Sola</span> in your area:
						</h1>
						<form className="findStoreForm">
							<input
								type="text"
								placeholder="Country"
								className="findStoreCountryInput"
							></input>
							<div className="findStoreSearchLine">
								<input
									type="text"
									placeholder="Postal Code"
									className="findStorePostalInput"
								></input>
								<button className="findStoreSearchButton">SEARCH</button>
							</div>
						</form>
						<div className="findStoreStylizedDiv"></div>
					</div>
					<div className="findStoreInfoModal">
						<p className="findStoreModalSubHead">FOR NEW CUSTOMERS</p>
						<h2 className="findStoreModalHead">Join the Sola Network</h2>
						<p className="findStoreModalBody">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi
							amet autem repudiandae doloribus ad inventore.
						</p>
						<div className="findStoreModalExit">X</div>
					</div>
				</section>
			</Fragment>
		);
	}
}

export default FindStore;
