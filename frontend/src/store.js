import { createStore , combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { productReducer , productDetailsReducer} from './reducers/productReducers';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer
})

let initialState = {}

const middleware = [thunk];
const store = createStore(reducer, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;