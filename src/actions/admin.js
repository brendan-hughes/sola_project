import {
	CHECK_ADMIN,
	LOAD_ORDERS,
	LOAD_INVENTORY,
	EDIT_ORDER,
	EDIT_PRODUCT,
	ADD_PRODUCT,
	REMOVE_PRODUCT,
	ADMIN_LOGOUT,
} from './types';

import axios from 'axios';

import firebase from 'firebase/app';
import firebaseStorage from 'firebase/storage';

export const checkAdmin = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/admin');
		dispatch({
			type: CHECK_ADMIN,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const adminLogOut = () => async (dispatch) => {
	try {
		dispatch({
			type: ADMIN_LOGOUT,
		});
	} catch (error) {
		console.log(error);
	}
};

export const loadOrders = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/admin/orders');
		const data = res.data.reverse();
		dispatch({
			type: LOAD_ORDERS,
			payload: data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const editOrders = (orderID, status, notes) => async (dispatch) => {
	try {
		let statusString = '';
		let noteString = '';
		if (status === '') {
			statusString = 'nochange';
		} else {
			statusString = status;
		}
		if (notes === '') {
			noteString = 'nochange';
		} else {
			noteString = notes;
		}
		const res = await axios.post('/api/admin/orders', {
			note: noteString,
			status: statusString,
			orderID,
		});
		const data = res.data.reverse();
		dispatch({
			type: LOAD_ORDERS,
			payload: data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const removeOrder = (orderID) => async (dispatch) => {
	try {
		const res = await axios.post('/api/admin/orders/remove', {
			orderID,
		});
		const data = res.data.reverse();
		dispatch({
			type: LOAD_ORDERS,
			payload: data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const loadInventory = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/admin/inventory');
		dispatch({
			type: LOAD_INVENTORY,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const saveInventory = (state) => async (dispatch) => {
	try {
		const body = {
			sku: state.sku,
			description: state.description,
			brand: state.brand,
			name: state.name,
			category: state.category,
			price: state.price,
			stock: state.stock,
		};

		const res = await axios.post('/api/admin/inventory', body);

		dispatch({
			type: LOAD_INVENTORY,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const saveImages = (state) => async (dispatch) => {
	console.log('In the API, saving, images.');
	console.log(state.addedImages);
	if (!firebase.apps.length) {
		const firebaseConfig = {
			apiKey: 'AIzaSyA_yN_Qvt0JCCAKFjwoSHoa1V8G4fIq8gM',
			authDomain: 'sola-b8331.firebaseapp.com',
			databaseURL: 'https://sola-b8331.firebaseio.com',
			projectId: 'sola-b8331',
			storageBucket: 'sola-b8331.appspot.com',
			messagingSenderId: '304188953924',
			appId: '1:304188953924:web:0ac558f29a331c00f5f311',
			measurementId: 'G-SWHNR7V607',
		};
		firebase.initializeApp(firebaseConfig);
	}

	const storage = firebase.storage();
	let imageList = [...state.images];
	const addedImages = state.addedImages;

	addedImages.forEach((image) => {
		imageList.push(image.imagedetails.name);

		const upload = storage
			.ref(`productImages/${state.sku}/${image.imagedetails.name}`)
			.put(image.imagedetails);
		upload.on(
			'state_changed',
			(snapshot) => {
				//Progress Function
			},
			(error) => {
				//Error Function
				console.group(error);
			},
			() => {
				//Complete Function
			}
		);
	});
	const body = {
		sku: state.sku,
		images: imageList,
	};
	console.log("This is what we're posting:");
	console.log(body);
	const res = await axios.post('/api/admin/imagesave', body);
	dispatch({
		type: LOAD_INVENTORY,
		payload: res.data,
	});
};

export const removeImage = (state, image) => async (dispatch) => {
	//Remove from firebase
	if (!firebase.apps.length) {
		const firebaseConfig = {
			apiKey: 'AIzaSyA_yN_Qvt0JCCAKFjwoSHoa1V8G4fIq8gM',
			authDomain: 'sola-b8331.firebaseapp.com',
			databaseURL: 'https://sola-b8331.firebaseio.com',
			projectId: 'sola-b8331',
			storageBucket: 'sola-b8331.appspot.com',
			messagingSenderId: '304188953924',
			appId: '1:304188953924:web:0ac558f29a331c00f5f311',
			measurementId: 'G-SWHNR7V607',
		};
		firebase.initializeApp(firebaseConfig);
	}

	const storage = firebase.storage();
	const deleteReference = storage.ref(`productImages/${state.sku}/${image}`);

	deleteReference
		.delete()
		.then()
		.catch((error) => {
			console.log(`productImages/${state.sku}/${image}`);
		});

	//Remove from mongoDB and return new state
	try {
		const body = {
			sku: state.sku,
			image,
		};

		const res = await axios.post('/api/admin/imageremove', body);

		dispatch({
			type: LOAD_INVENTORY,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const removeProduct = (sku) => async (dispatch) => {
	try {
		const res = await axios.post('/api/admin/inventory/remove/' + sku);
		dispatch({
			type: LOAD_INVENTORY,
			payload: res.data,
		});
	} catch (error) {
		console.log(error);
	}
};
