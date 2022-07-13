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
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
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
            payload: error.response.data.message
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

// Update profile
export const updateProfile = (name, email) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST })

        const userData = {
            name : name,
            email: email
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put('http://localhost:8080/api/current-user/update', userData, config);
        console.log({data});
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Logout user
export const logout = () => async (dispatch) => {
    try {

        await axios.get('http://localhost:8080/api/logout')

        dispatch({
            type: LOGOUT_SUCCESS,
        })

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
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