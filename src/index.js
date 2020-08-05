import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import SignIn from './components/SignIn/SignIn';
import Footer from './components/Home/Footer/Footer';
import ProductView from './components/Shop/ProductView/ProductView';
import CategoryView from './components/Shop/CategoryView/CategoryView';
import FindStore from './components/FindStore/FindStore';
import Cart from './components/Cart/Cart';

ReactDOM.render(
	<Router>
		<Navbar />
		<Route exact path="/" component={Home} />
		<Route exact path="/shop" component={CategoryView} />
		<Route exact path="/contact" component={Contact} />
		<Route exact path="/findstore" component={FindStore} />
		<Route exact path="/signin" component={SignIn} />
		<Route exact path="/product" component={ProductView} />
		<Route exact path="/cart" component={Cart} />
		<Footer />
	</Router>,
	document.getElementById('root')
);
