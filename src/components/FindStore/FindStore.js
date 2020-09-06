import React, { Fragment, Component } from 'react';
import { GoogleMap } from 'react-google-maps';
import Map from './Map';
import './findstore.css';
import { viewedModal } from '../../actions/nav';
import { connect } from 'react-redux';

class FindStore extends Component {
	componentDidMount() {
		setTimeout(() => {
			if (this.props.didViewModal === false) {
				const modal = document.querySelector('.findStoreInfoModal');
				modal.classList.remove('hideFindStoreModal');
			}
		}, 1000);
	}
	render() {
		return (
			<Fragment>
				<section className="findStoreSection">
					<Map />
					{this.props.didViewModal === false ? (
						<div className="findStoreInfoModal hideFindStoreModal">
							<p className="findStoreModalSubHead">FOR NEW CUSTOMERS</p>
							<h2 className="findStoreModalHead">Join the Sola Network</h2>
							<p className="findStoreModalBody">
								Lorem ipsum dolor, sit amet consectetur adipisicing elit.
								Commodi amet autem repudiandae doloribus ad inventore.
							</p>
							<div
								onClick={() => {
									document
										.querySelector('.findStoreInfoModal')
										.classList.add('hideFindStoreModal');
									setTimeout(() => {
										this.props.viewedModal();
									}, 1000);
								}}
								className="findStoreModalExit"
							>
								X
							</div>
						</div>
					) : null}
				</section>
			</Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	didViewModal: state.nav.viewedModal,
});

export default connect(mapStateToProps, { viewedModal })(FindStore);
