import { createStore , combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { productReducer , productDetailsReducer} from './reducers/productReducers';
import { authReducer } from './reducers/userReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    auth: authReducer
})

let initialState = {}

const middleware = [thunk];
const store = createStore(reducer, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;