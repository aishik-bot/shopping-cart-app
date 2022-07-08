import axios from "axios";
import { LOGIN_REQUEST,
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    REGISTER_USER_REQUEST, 
    REGISTER_USER_SUCCESS, 
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERROR } from "../constants/userConstants";

// User login
export const login = (email, password)=> async(dispatch)=> {
    try {
        dispatch({type: LOGIN_REQUEST});

        console.log(email+ " : "+ password);
        const credentials = {
            email: email,
            password: password
        }

        const { data } = await axios.post('http://localhost:8080/api/login', credentials);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

//Register user
export const register = (name, email, password)=> async(dispatch)=>{
    try {
        dispatch({type: REGISTER_USER_REQUEST})

        const userData = {
            name: name,
            email: email,
            password: password
        }
        const { data } = await axios.post('http://localhost:8080/api/register', userData);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response
        })
    }
}

// Load user
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('http://localhost:8080/api/current-user');

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
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