import React, { Fragment, Component } from 'react';
import { GoogleMap } from 'react-google-maps';
import Map from './Map';
import './findstore.css';

class FindStore extends Component {
	render() {
		return (
			<Fragment>
				<section className="findStoreSection">
					<Map />

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
