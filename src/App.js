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
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

class App extends Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}

	render() {
		return (
			<Provider store={store}>
				<Fragment>
					<Router>
						<Navbar />
						<Route exact path="/" component={Home} />
						<Route exact path="/shop" component={CategoryView} />
						<Route exact path="/contact" component={Contact} />
						<Route exact path="/findstore" component={FindStore} />
						<Route exact path="/signin" component={SignIn} />
						<Route exact path="/signin/register" component={Register} />
						<Route exact path="/product" component={ProductView} />
						<Route exact path="/cart" component={Cart} />
						<Footer />
					</Router>
				</Fragment>
			</Provider>
		);
	}
}

export default App;
