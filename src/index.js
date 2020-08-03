import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import Contact from './components/Contact/Contact';
import SignIn from './components/SignIn/SignIn';

ReactDOM.render(
	<Router>
		<Navbar />
		<Route exact path="/" component={Home} />
		<Route exact path="/shop" component={Shop} />
		<Route exact path="/contact" component={Contact} />
		<Route exact path="/signin" component={SignIn} />
	</Router>,
	document.getElementById('root')
);
