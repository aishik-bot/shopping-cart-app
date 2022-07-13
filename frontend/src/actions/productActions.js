import axios from 'axios';
import { ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST, 
    ALL_PRODUCTS_SUCCESS, 
    CLEAR_ERROR,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAIL,
    
} from "../constants/productConstants";

export const getProducts = (keyword = '', currentPage = 1)=> async (dispatch) =>{
    try {
        dispatch({
            type: ALL_PRODUCTS_REQUEST,
        })
        //get product details from backend
        const { data } = await axios.get(`http://localhost:8080/api/products?keyword=${keyword}&page=${currentPage}`)

        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: "Error ocurred"
        })
    }
}

export const getProductDetails = (id)=> async (dispatch) =>{
    try {
        console.log(id);
        //dispatcher for request of product details
        dispatch({
            type: PRODUCT_DETAILS_REQUEST,
        })
        //get product details of given id from backend
        const { data } = await axios.get(`http://localhost:8080/api/products/${id}`)
        //dispatcher for product details
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message
        })
    }
}

//add new Product
export const newProduct = (productData) => async (dispatch) =>{
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const {data} = await axios.post('http://localhost:8080/api/admin/product/new', productData);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Clear all errors
export const clearErrors = ()=> async (dispatch)=>{
    dispatch({
        type: CLEAR_ERROR
    })
}