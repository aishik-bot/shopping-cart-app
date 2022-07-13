import { createStore , combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { productReducer , productDetailsReducer, newProductReducer} from './reducers/productReducers';
import { authReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    newProduct: newProductReducer,
    auth: authReducer,
    user: userReducer,
    cart:cartReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
})

let initialState = {
    cart:{
        cartItems:localStorage.getItem('cartitems')
        ?JSON.parse(localStorage.getItem('cartitems'))
        :[],
        shippingAddress: localStorage.getItem("shippingAddress")
        ?JSON.parse(localStorage.getItem("shippingAddress"))
        :{}
    }
}

const middleware = [thunk];
const store = createStore(reducer, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;