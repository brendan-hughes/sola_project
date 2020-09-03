import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import SignIn from './components/SignIn/SignIn';
import Register from './components/SignIn/Register';
import Footer from './components/Home/Footer/Footer';
import ProductView from './components/Shop/ProductView/ProductView';
import CategoryView from './components/Shop/CategoryView/CategoryView';
import FindStore from './components/FindStore/FindStore';
import Cart from './components/Cart/Cart';
import Admin from './components/Admin/Admin';
import SuccessfulCheckout from './components/Status/SuccessfulCheckout';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { checkAdmin } from './actions/admin';
import setAuthToken from './utils/setAuthToken';
import { loadCart } from './actions/cart';
import { loadNav } from './actions/nav';
import TagManager from 'react-gtm-module';

const tagManagerArgs = {
	gtmId: 'GTM-P3MXV28',
	dataLayer: {},
};

TagManager.initialize(tagManagerArgs);

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
		store.dispatch(loadNav());
		store.dispatch(loadCart(localStorage.getItem('cartToken')));
		store.dispatch(checkAdmin());
	}

	render() {
		return (
			<Provider store={store}>
				<Router>
					<Navbar />
					<Route exact path="/" component={Home} />
					<Route path="/shop" component={CategoryView} />
					<Route exact path="/contact" component={Contact} />
					<Route exact path="/findstore" component={FindStore} />
					<Route exact path="/signin" component={SignIn} />
					<Route exact path="/signin/register" component={Register} />
					<Route path="/product" component={ProductView} />
					<Route exact path="/cart" component={Cart} />
					<Route exact path="/success" component={SuccessfulCheckout} />
					<Route exact path="/admin" component={Admin} />
					<Footer />
				</Router>
			</Provider>
		);
	}
}

export default App;
