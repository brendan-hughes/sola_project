import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import cart from './cart';
import shop from './shop';
import product from './product';

export default combineReducers({ alert, auth, cart, shop, product });
