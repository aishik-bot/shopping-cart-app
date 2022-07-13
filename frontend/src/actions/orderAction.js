import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
} from "../constants/orderConstants";
import store from "../store";

export const createOrder = (order) => async (dispatch,getState) => {
  console.log(order)
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
   

    const config = {
      headers: {
        "Contnet-Type": "application/json"
      },
    };
    const { data } = await axios.post("http://localhost:8080/api/order", order, config);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  const {user} = useSelector(state=>state.auth)
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
   
    const config = {
      headers: {
        "Content-Type": "application/json",
    
       
      },
    };
    const { data } = await axios.get(`http://localhost:8080/api/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder =(orderId, paymentResult) => async (dispatch) => {
    const {user} = useSelector(state=>state.auth)
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });
      
      
      const config = {
        headers: {
          "Content-Type": "application/json",
         
        },
      };
      const { data } = await axios.put(`http://localhost:8080/api/${orderId}/pay`,paymentResult,config);
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listMyOrders = () => async (dispatch) => {
  const {user} = useSelector(state=>state.auth)
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });
    
    
    const { data } = await axios.get("http://localhost:8080/api/myorders");
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
