import React, { useState, Fragment } from 'react';
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';

import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from 'use-places-autocomplete';

import {
	Combobox,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
	ComboboxInput,
} from '@reach/combobox';
import '@reach/combobox/styles.css';
import mapStyles from './mapStyles';

const libraries = ['places'];
const mapContainerStyle = {
	height: '100vh',
	width: '100vw',
};

export default function Map() {
	const mapRef = React.useRef();
	const onMapLoad = React.useCallback((map) => {
		mapRef.current = map;
	}, []);

	const panTo = React.useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(14);
	}, []);
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: 'AIzaSyBCNgwioPacvDTvQgyqWaTeXj9TZPgs8s8',
		libraries,
	});
	const [selectedStore, setSelectedStore] = useState(null);
	if (loadError) {
		return <h1 className="errrror">Error: {loadError} </h1>;
	}
	if (!isLoaded) return <h1 className="errrror">Loading </h1>;
	if (isLoaded) {
		console.log('WOO!');
	}

	return (
		<Fragment>
			<Search panTo={panTo} />
			<div className="findStoreMapArea">
				<GoogleMap
					mapContainerStyle={mapContainerStyle}
					zoom={9}
					center={{ lat: 44.1529, lng: -79.8686 }}
					options={{ styles: mapStyles }}
					onLoad={onMapLoad}
				>
					<Marker
						key={'storeA'}
						position={{ lat: 44.48234, lng: -80.20809 }}
						onClick={() =>
							setSelectedStore({
								store: 'Sola: Collingwood',
								location: [44.48234, -80.20809],
								description: 'Example description.',
							})
						}
					/>
					<Marker
						key={'storeB'}
						position={{ lat: 43.6532, lng: -79.3832 }}
						onClick={() =>
							setSelectedStore({
								store: 'Sola: Toronto',
								location: [43.6532, -79.3832],
								description: 'Example description.',
							})
						}
					/>
					<Marker
						key={'storeC'}
						position={{ lat: 44.308928, lng: -80.1323808 }}
						onClick={() =>
							setSelectedStore({
								store: 'Sola: Creemore',
								location: [44.308928, -80.1323808],
								description: 'Example description.',
							})
						}
					/>
					{selectedStore ? (
						<InfoWindow
							position={{
								lat: selectedStore.location[0],
								lng: selectedStore.location[1],
							}}
							onCloseClick={() => {
								setSelectedStore(null);
							}}
						>
							<div>
								<p className="mapName">{selectedStore.store}</p>
								<p className="mapDescription">{selectedStore.description}</p>
							</div>
						</InfoWindow>
					) : null}
				</GoogleMap>
			</div>
		</Fragment>
	);
}

function Search({ panTo }) {
	const {
		ready,
		value,
		suggestions: { status, data },
		setValue,
		clearSuggestions,
	} = usePlacesAutocomplete({
		requestOptions: {
			location: { lat: () => 44.1529, lng: () => -79.8686 },
			radius: 200000,
		},
	});

	return (
		<div className="findStoreSearchArea">
			<h1 className="findStoreHeader">
				Find <span className="colorize2">Sola</span> in your area:
			</h1>
			<div className="findStoreForm">
				<Combobox
					onSelect={async (address) => {
						setValue(address, false);
						clearSuggestions();
						try {
							//Put this in the button after
							const results = await getGeocode({ address });
							const { lat, lng } = await getLatLng(results[0]);
							panTo({ lat, lng });
						} catch (error) {
							console.log(error);
						}
					}}
				>
					<ComboboxInput
						placeholder={!ready ? 'Loading...' : 'Enter an address'}
						value={value}
						className="findStoreCountryInput"
						disabled={!ready}
						onChange={(e) => {
							setValue(e.target.value);
						}}
					></ComboboxInput>
					<ComboboxPopover className="locationSearchPopover">
						{status === 'OK'
							? data.map(({ id, description }) => (
									<ComboboxOption
										className="locationSearchOption"
										key={id}
										value={description}
									></ComboboxOption>
							  ))
							: null}
					</ComboboxPopover>
				</Combobox>
				<div className="findStoreSearchLine"></div>
			</div>
			<div className="findStoreStylizedDiv"></div>
		</div>
	);
}
